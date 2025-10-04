import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, ip } = await req.json() as { data: ContactSubmission; ip?: string };
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    console.log('Processing contact submission from:', ip);

    // Rate limiting check
    const windowMinutes = 60;
    const maxSubmissions = 5;
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('form_rate_limits')
      .select('submission_count, window_start')
      .eq('ip_address', ip || 'unknown')
      .eq('form_type', 'contact')
      .gte('window_start', windowStart)
      .maybeSingle();

    if (rateLimitError && rateLimitError.code !== 'PGRST116') {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (rateLimitData && rateLimitData.submission_count >= maxSubmissions) {
      console.warn('Rate limit exceeded for IP:', ip);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: windowMinutes * 60 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Insert contact submission
    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
        ip_address: ip || null,
        user_agent: userAgent,
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    // Update rate limit
    await supabase
      .from('form_rate_limits')
      .upsert({
        ip_address: ip || 'unknown',
        form_type: 'contact',
        submission_count: (rateLimitData?.submission_count || 0) + 1,
        window_start: rateLimitData?.window_start || new Date().toISOString(),
        last_submission: new Date().toISOString(),
      }, {
        onConflict: 'ip_address,form_type'
      });

    console.log('Contact submission successful');

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing contact submission:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

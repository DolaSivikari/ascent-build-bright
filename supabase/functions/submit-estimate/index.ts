import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EstimateSubmission {
  service: string;
  sqft: number;
  stories: string;
  prepComplexity: string;
  finishQuality: string;
  region: string;
  scaffolding?: string;
  colorConsultation: boolean;
  rushScheduling: boolean;
  warrantyExtension: boolean;
  siteCleanup: boolean;
  estimateMin: number;
  estimateMax: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferredContact?: string;
  notes?: string;
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

    const { data, ip } = await req.json() as { data: EstimateSubmission; ip?: string };
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    console.log('Processing estimate request from:', ip);

    // Rate limiting check
    const windowMinutes = 60;
    const maxSubmissions = 3;
    const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('form_rate_limits')
      .select('submission_count, window_start')
      .eq('ip_address', ip || 'unknown')
      .eq('form_type', 'estimate')
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

    // Insert estimate request
    const { error: insertError } = await supabase
      .from('estimate_requests')
      .insert({
        service: data.service,
        sqft: data.sqft,
        stories: data.stories,
        prep_complexity: data.prepComplexity,
        finish_quality: data.finishQuality,
        region: data.region,
        scaffolding: data.scaffolding || null,
        color_consultation: data.colorConsultation,
        rush_scheduling: data.rushScheduling,
        warranty_extension: data.warrantyExtension,
        site_cleanup: data.siteCleanup,
        estimate_min: data.estimateMin,
        estimate_max: data.estimateMax,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        preferred_contact: data.preferredContact || null,
        notes: data.notes || null,
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
        form_type: 'estimate',
        submission_count: (rateLimitData?.submission_count || 0) + 1,
        window_start: rateLimitData?.window_start || new Date().toISOString(),
        last_submission: new Date().toISOString(),
      }, {
        onConflict: 'ip_address,form_type'
      });

    console.log('Estimate request successful');

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error processing estimate request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

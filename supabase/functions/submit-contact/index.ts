import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const allowedOrigins = [
  Deno.env.get('ALLOWED_ORIGIN') || 'https://wiksprbjwvifckfmlndh.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:4173'
];

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

// Input validation schema
const validateContactSubmission = (data: any): { valid: boolean; errors?: string[] } => {
  const errors: string[] = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  } else if (data.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }
  
  if (data.phone && (typeof data.phone !== 'string' || data.phone.length > 20)) {
    errors.push('Phone must be less than 20 characters');
  }
  
  if (data.subject && (typeof data.subject !== 'string' || data.subject.length > 200)) {
    errors.push('Subject must be less than 200 characters');
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  return errors.length > 0 ? { valid: false, errors } : { valid: true };
};

// Extract real IP address from request
const getRealIP = (req: Request): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  return realIP || 'unknown';
};

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

    const { data } = await req.json() as { data: ContactSubmission };
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ip = getRealIP(req);

    console.log('Processing contact submission from:', ip);

    // Validate input
    const validation = validateContactSubmission(data);
    if (!validation.valid) {
      console.warn('Validation failed:', validation.errors);
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

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

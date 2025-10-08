import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const payload = await req.json();

    console.log('Received quote submission:', payload);

    // 1. Insert into Supabase (get submission ID)
    const { data: submission, error: dbError } = await supabase
      .from('quote_submissions')
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        address: payload.address,
        package: payload.package,
        message: payload.message || null,
        photo_urls: payload.photo_urls || [],
        source_variant: payload.source_variant,
        user_agent: req.headers.get('user-agent'),
        ip_address: req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
      })
      .select()
      .single();

    if (dbError) throw new Error(`DB Error: ${dbError.message}`);

    console.log('Quote saved to database:', submission.id);

    // 2. Send email via Resend (if API key is configured)
    if (RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #001F3F;">New Quote Request — ${payload.name} — ${payload.package.toUpperCase()}</h2>
          <p><strong>Submission ID:</strong> <code>${submission.id}</code></p>
          <p><strong>A/B Test Variant:</strong> ${payload.source_variant || 'N/A'}</p>
          
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          
          <h3>Contact Information</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Name:</strong> ${payload.name}</li>
            <li><strong>Phone:</strong> <a href="tel:${payload.phone}">${payload.phone}</a></li>
            ${payload.email ? `<li><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></li>` : ''}
            <li><strong>Address:</strong> ${payload.address}</li>
          </ul>
          
          <h3>Project Details</h3>
          <ul style="line-height: 1.8;">
            <li><strong>Package:</strong> ${payload.package.charAt(0).toUpperCase() + payload.package.slice(1)}</li>
            ${payload.message ? `<li><strong>Message:</strong> ${payload.message}</li>` : ''}
          </ul>
          
          ${payload.photo_urls && payload.photo_urls.length > 0 ? `
            <h3>Uploaded Photos</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              ${payload.photo_urls.map((url: string) => `
                <a href="${url}" target="_blank">
                  <img src="${url}" alt="Project photo" style="max-width: 150px; height: auto; border-radius: 4px;">
                </a>
              `).join('')}
            </div>
          ` : ''}
          
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #666;">
            <strong>Referrer:</strong> ${payload.referrer}<br>
            <strong>Time:</strong> ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
          </p>
          
          <a href="https://ascent-build-bright.lovable.app/admin" 
             style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #001F3F; color: white; text-decoration: none; border-radius: 4px;">
            View in Admin Dashboard
          </a>
        </div>
      `;

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Ascent Group <noreply@ascent-build-bright.lovable.app>',
          to: ['ops@ascent-build-bright.lovable.app'],
          subject: `New Quote Request — ${payload.name} — ${payload.package.toUpperCase()}`,
          html: emailHtml,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Resend API error:', errorText);
        // Don't fail the request if email fails
      } else {
        console.log('Email sent successfully');
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        id: submission.id,
        message: 'Quote submitted successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('Quote submission error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

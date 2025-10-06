import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Whitelist-based CORS for enhanced security
const allowedOrigins = [
  Deno.env.get("ALLOWED_ORIGIN"),
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean);

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
});

serve(async (req) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if email already exists
    const { data: existing } = await supabaseClient
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return new Response(
        JSON.stringify({ message: "Already subscribed" }),
        { status: 200, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    // Insert new subscriber
    const { error: insertError } = await supabaseClient
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          subscribed_at: new Date().toISOString(),
          is_active: true,
        },
      ]);

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ message: "Successfully subscribed" }),
      { status: 200, headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    const origin = req.headers.get("origin");
    const headers = corsHeaders(origin);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});

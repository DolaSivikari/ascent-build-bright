import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const caseStudyId = pathParts[pathParts.length - 1];
    const method = req.method;

    // LIST case studies
    if (method === 'GET' && !caseStudyId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const search = url.searchParams.get('search') || '';
      const status = url.searchParams.get('status') || '';

      let query = supabase
        .from('case_studies')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (search) {
        query = query.or(`title.ilike.%${search}%,client_name.ilike.%${search}%`);
      }
      if (status) {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query
        .range((page - 1) * limit, page * limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({
          data,
          pagination: {
            page,
            limit,
            total: count,
            totalPages: Math.ceil((count || 0) / limit),
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET single case study
    if (method === 'GET') {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', caseStudyId)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CREATE case study
    if (method === 'POST') {
      const body = await req.json();
      
      let slug = body.slug;
      if (!slug && body.title) {
        slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      const caseStudyData = {
        ...body,
        slug,
      };

      const { data, error } = await supabase
        .from('case_studies')
        .insert([caseStudyData])
        .select()
        .single();

      if (error) throw error;

      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'create',
        resource_type: 'case_study',
        resource_id: data.id,
        new_values: data,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UPDATE case study
    if (method === 'PUT') {
      const body = await req.json();
      
      const { data, error } = await supabase
        .from('case_studies')
        .update(body)
        .eq('id', caseStudyId)
        .select()
        .single();

      if (error) throw error;

      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'update',
        resource_type: 'case_study',
        resource_id: caseStudyId,
        new_values: body,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE case study
    if (method === 'DELETE') {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', caseStudyId);

      if (error) throw error;

      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'delete',
        resource_type: 'case_study',
        resource_id: caseStudyId,
      }]);

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in case-studies-crud:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

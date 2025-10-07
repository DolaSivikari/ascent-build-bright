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
    const articleId = pathParts[pathParts.length - 1];
    const method = req.method;

    // LIST articles with pagination and filters
    if (method === 'GET' && !articleId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      const search = url.searchParams.get('search') || '';
      const status = url.searchParams.get('status') || '';
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const offset = (page - 1) * limit;

      let query = supabase
        .from('articles')
        .select('*, author:profiles!articles_author_id_fkey(full_name, email)', { count: 'exact' });

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
      }

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return new Response(
        JSON.stringify({ data, count, page, limit }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET single article
    if (method === 'GET') {
      const { data, error } = await supabase
        .from('articles')
        .select('*, author:profiles!articles_author_id_fkey(full_name, email)')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CREATE article
    if (method === 'POST') {
      const body = await req.json();
      
      // Auto-generate slug if not provided
      let slug = body.slug;
      if (!slug && body.title) {
        slug = body.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      const articleData = {
        ...body,
        slug,
        author_id: body.author_id || user.id,
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;

      // Create initial version
      await supabase.from('article_versions').insert([{
        article_id: data.id,
        version_number: 1,
        title: data.title,
        body: data.body,
        excerpt: data.excerpt,
        changed_by: user.id,
        change_summary: 'Initial version',
        snapshot: data,
      }]);

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'create',
        resource_type: 'article',
        resource_id: data.id,
        new_values: data,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UPDATE article
    if (method === 'PUT') {
      const body = await req.json();
      
      // Get current version
      const { data: current } = await supabase
        .from('articles')
        .select()
        .eq('id', articleId)
        .single();

      const { data, error } = await supabase
        .from('articles')
        .update(body)
        .eq('id', articleId)
        .select()
        .single();

      if (error) throw error;

      // Get latest version number
      const { data: versions } = await supabase
        .from('article_versions')
        .select('version_number')
        .eq('article_id', articleId)
        .order('version_number', { ascending: false })
        .limit(1);

      const nextVersion = (versions?.[0]?.version_number || 0) + 1;

      // Create new version
      await supabase.from('article_versions').insert([{
        article_id: articleId,
        version_number: nextVersion,
        title: data.title,
        body: data.body,
        excerpt: data.excerpt,
        changed_by: user.id,
        change_summary: body.change_summary || 'Updated',
        snapshot: data,
      }]);

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'update',
        resource_type: 'article',
        resource_id: articleId,
        old_values: current,
        new_values: data,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE article
    if (method === 'DELETE') {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', articleId);

      if (error) throw error;

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'delete',
        resource_type: 'article',
        resource_id: articleId,
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
    console.error('Error in articles-crud:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

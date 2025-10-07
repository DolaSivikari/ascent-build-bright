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
    const mediaId = pathParts[pathParts.length - 1];
    const method = req.method;

    // LIST media with pagination and filters
    if (method === 'GET' && !mediaId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      const search = url.searchParams.get('search') || '';
      const folder = url.searchParams.get('folder') || '';
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '20');
      const offset = (page - 1) * limit;

      let query = supabase
        .from('media')
        .select('*, uploader:profiles!media_uploaded_by_fkey(full_name, email)', { count: 'exact' });

      if (search) {
        query = query.or(`filename.ilike.%${search}%,alt_text.ilike.%${search}%,caption.ilike.%${search}%`);
      }

      if (folder) {
        query = query.eq('folder', folder);
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

    // GET single media
    if (method === 'GET') {
      const { data, error } = await supabase
        .from('media')
        .select('*, uploader:profiles!media_uploaded_by_fkey(full_name, email)')
        .eq('id', mediaId)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // CREATE media record (after upload)
    if (method === 'POST') {
      const body = await req.json();
      
      const mediaData = {
        ...body,
        uploaded_by: user.id,
      };

      const { data, error } = await supabase
        .from('media')
        .insert([mediaData])
        .select()
        .single();

      if (error) throw error;

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'create',
        resource_type: 'media',
        resource_id: data.id,
        new_values: data,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // UPDATE media metadata
    if (method === 'PUT') {
      const body = await req.json();
      
      const { data, error } = await supabase
        .from('media')
        .update(body)
        .eq('id', mediaId)
        .select()
        .single();

      if (error) throw error;

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'update',
        resource_type: 'media',
        resource_id: mediaId,
        new_values: body,
      }]);

      return new Response(
        JSON.stringify(data),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE media
    if (method === 'DELETE') {
      // Get media info first
      const { data: media } = await supabase
        .from('media')
        .select('storage_path')
        .eq('id', mediaId)
        .single();

      if (media?.storage_path) {
        // Delete from storage
        await supabase.storage
          .from('media')
          .remove([media.storage_path]);
      }

      // Delete from database
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);

      if (error) throw error;

      // Log audit
      await supabase.from('audit_logs').insert([{
        user_id: user.id,
        action: 'delete',
        resource_type: 'media',
        resource_id: mediaId,
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
    console.error('Error in media-crud:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

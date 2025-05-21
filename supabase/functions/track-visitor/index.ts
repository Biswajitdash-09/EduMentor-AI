
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { pagePath } = await req.json();
    
    if (!pagePath) {
      return new Response(
        JSON.stringify({ error: "Page path is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get existing page stats
    const { data: existingStats, error: fetchError } = await supabaseAdmin
      .from("site_statistics")
      .select("id, visitor_count")
      .eq("page_path", pagePath)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "not found"
      throw fetchError;
    }

    let result;

    if (existingStats) {
      // Update existing record
      const { data, error } = await supabaseAdmin
        .from("site_statistics")
        .update({
          visitor_count: existingStats.visitor_count + 1,
          last_updated: new Date().toISOString(),
        })
        .eq("id", existingStats.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new record
      const { data, error } = await supabaseAdmin
        .from("site_statistics")
        .insert({
          page_path: pagePath,
          visitor_count: 1,
          last_updated: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});


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
    const { userId, points, completedCourse, completedAssessment } = await req.json();
    
    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize Supabase client with service role key to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get existing achievement record
    const { data: existingAchievement, error: fetchError } = await supabaseAdmin
      .from("user_achievements")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 is "not found"
      throw fetchError;
    }

    if (existingAchievement) {
      // Update existing record
      const { data, error } = await supabaseAdmin
        .from("user_achievements")
        .update({
          points: existingAchievement.points + (points || 0),
          completed_courses: completedCourse 
            ? existingAchievement.completed_courses + 1 
            : existingAchievement.completed_courses,
          completed_assessments: completedAssessment 
            ? existingAchievement.completed_assessments + 1 
            : existingAchievement.completed_assessments,
          last_activity: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      // Create new record
      const { data, error } = await supabaseAdmin
        .from("user_achievements")
        .insert({
          user_id: userId,
          points: points || 0,
          completed_courses: completedCourse ? 1 : 0,
          completed_assessments: completedAssessment ? 1 : 0,
          last_activity: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

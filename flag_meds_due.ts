// flag_due_meds.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://deno.land/x/supabase_js@2.39.5/mod.ts";

serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("https://lhyxuuomjusjmkycuwuh.supabase.co")!,
    Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoeXh1dW9tanVzam1reWN1d3VoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTA4NzQ2MiwiZXhwIjoyMDU2NjYzNDYyfQ.VHnqho_4XqVXsxYhBVD-kVTF_Rksx5D2_0CSaljsgfc")!
  );

  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();

  const { error } = await supabase
    .from("medicine_schedules")
    .update({ should_alert: true, last_alerted_at: now })
    .eq("taken", false)
    .eq("should_alert", false)
    .eq("time_hour", hours)
    .eq("time_minute", minutes);

  return new Response(error ? JSON.stringify(error) : "✅ Alerts flagged");
});

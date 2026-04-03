import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

let client: SupabaseClient<Database> | null = null;

export function createClient(): SupabaseClient<Database> {
  if (typeof window === "undefined") {
    throw new Error("createClient() is for browser use only. Use createServerClient in server components.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  if (!client) {
    client = createSupabaseClient<Database>(supabaseUrl, supabasePublishableKey);
  }

  return client;
}

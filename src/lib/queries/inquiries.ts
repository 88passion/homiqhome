import { createServerClient } from "@/lib/supabase/server";
import type { Database, Json } from "@/types/database";

export async function createInquiry(payload: {
  inquiry_type: string;
  source_page?: string;
  property_id?: string;
  name: string;
  phone: string;
  email?: string;
  line_id?: string;
  message: string;
  payload?: Json;
}) {
  const supabase = await createServerClient();
  const insertPayload: Database["public"]["Tables"]["inquiries"]["Insert"] = payload;
  return supabase.from("inquiries").insert(insertPayload).select("id").single();
}

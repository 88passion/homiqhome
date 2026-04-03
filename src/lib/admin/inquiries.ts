import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type InquiryRow = Database["public"]["Tables"]["inquiries"]["Row"];

export async function getAdminInquiries(): Promise<InquiryRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function updateInquiryStatus(id: string, status: InquiryRow["status"]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data;
}

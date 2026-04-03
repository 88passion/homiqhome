"use server";

import { revalidatePath } from "next/cache";
import { updateInquiryStatus } from "@/lib/admin/inquiries";
import type { Database } from "@/types/database";

export async function updateInquiryStatusAction(
  inquiryId: string,
  status: Database["public"]["Tables"]["inquiries"]["Row"]["status"]
) {
  await updateInquiryStatus(inquiryId, status);
  revalidatePath("/admin/inquiries");
}

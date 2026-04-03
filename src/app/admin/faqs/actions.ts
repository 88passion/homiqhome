"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminFaq, updateAdminFaq } from "@/lib/admin/content";

function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

export async function saveFaqAction(faqId: string | null, formData: FormData) {
  const question = getString(formData, "question");
  const answer = getString(formData, "answer");
  const sortOrder = Number(getString(formData, "sortOrder") || "0");
  const isPublished = formData.get("isPublished") === "on";

  const payload = {
    question,
    answer,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_published: isPublished,
  };

  if (faqId) {
    await updateAdminFaq(faqId, payload);
  } else {
    await createAdminFaq(payload);
  }

  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  redirect("/admin/faqs");
}

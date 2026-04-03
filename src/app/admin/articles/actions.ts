"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminArticle, updateAdminArticle } from "@/lib/admin/content";

function getString(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

export async function saveArticleAction(articleId: string | null, formData: FormData) {
  const title = getString(formData, "title");
  const slug = getString(formData, "slug");
  const excerpt = getString(formData, "excerpt") || null;
  const content = getString(formData, "content");
  const coverImageUrl = getString(formData, "coverImageUrl") || null;
  const isPublished = formData.get("isPublished") === "on";

  const payload = {
    title,
    slug,
    excerpt,
    content,
    cover_image_url: coverImageUrl,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  };

  if (articleId) {
    await updateAdminArticle(articleId, payload);
  } else {
    await createAdminArticle(payload);
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  if (slug) revalidatePath(`/articles/${slug}`);
  redirect("/admin/articles");
}

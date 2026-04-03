import { createServerClient } from "@/lib/supabase/server";

export async function getPublishedArticles() {
  const supabase = await createServerClient();
  return supabase
    .from("articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
}

export async function getPublishedArticleBySlug(slug: string) {
  const supabase = await createServerClient();
  return supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
}

export async function getPublishedFaqs() {
  const supabase = await createServerClient();
  return supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
}

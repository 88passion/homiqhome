import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];
type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];

export async function getAdminArticles(): Promise<ArticleRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAdminArticleById(id: string): Promise<ArticleRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createAdminArticle(input: Database["public"]["Tables"]["articles"]["Insert"]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("articles").insert(input).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAdminArticle(id: string, input: Database["public"]["Tables"]["articles"]["Update"]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("articles").update(input).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getAdminFaqs(): Promise<FaqRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAdminFaqById(id: string): Promise<FaqRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createAdminFaq(input: Database["public"]["Tables"]["faqs"]["Insert"]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("faqs").insert(input).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAdminFaq(id: string, input: Database["public"]["Tables"]["faqs"]["Update"]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("faqs").update(input).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return data;
}

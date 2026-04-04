import { createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type PropertyType = Database["public"]["Tables"]["properties"]["Row"]["property_type"];

export async function getLatestProperties(limit = 4) {
  const supabase = await createServerClient();
  return supabase
    .from("properties")
    .select("*, property_images(*)")
    .in("status", ["published", "sold", "rented"])
    .eq("is_latest", true)
    .order("created_at", { ascending: false })
    .limit(limit);
}

export async function getPublishedProperties({
  purpose,
  province,
  district,
  propertyType,
  bedrooms,
  maxPrice,
}: {
  purpose?: "buy" | "rent";
  province?: string;
  district?: string;
  propertyType?: PropertyType;
  bedrooms?: number;
  maxPrice?: number;
}) {
  const supabase = await createServerClient();
  let query = supabase
    .from("properties")
    .select("*, property_images(*)")
    .in("status", ["published", "sold", "rented"])
    .order("created_at", { ascending: false });

  if (purpose) query = query.eq("purpose", purpose);
  if (province) query = query.eq("province", province);
  if (district) query = query.eq("district", district);
  if (propertyType) query = query.eq("property_type", propertyType);
  if (bedrooms) query = query.gte("bedrooms", bedrooms);
  if (maxPrice) query = query.lte("price", maxPrice);

  return query;
}

export async function getPropertyBySlug(slug: string) {
  const supabase = await createServerClient();
  return supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("slug", slug)
    .in("status", ["published", "sold", "rented"])
    .single();
}

export async function getRelatedProperties({
  propertyId,
  purpose,
  province,
  limit = 4,
}: {
  propertyId: string;
  purpose: "buy" | "rent";
  province: string;
  limit?: number;
}) {
  const supabase = await createServerClient();
  return supabase
    .from("properties")
    .select("*, property_images(*)")
    .in("status", ["published", "sold", "rented"])
    .eq("purpose", purpose)
    .eq("province", province)
    .neq("id", propertyId)
    .limit(limit);
}

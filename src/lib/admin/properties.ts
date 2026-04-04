import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { slugifyPropertyTitle, formatHmCode, normalizePropertySlug } from "@/lib/properties/identity";
import { mapProperty } from "@/lib/supabase/mappers";
import type { Database } from "@/types/database";
import type { Property, PropertyStatus, PropertyType } from "@/types/property";

export interface PropertyAdminInput {
  code: string;
  slug: string;
  title: string;
  purpose: "buy" | "rent";
  propertyType: PropertyType;
  province: string;
  district: string;
  subdistrict?: string | null;
  locationText: string;
  addressText?: string | null;
  price: number;
  landAreaSqw?: number | null;
  usableAreaSqm?: number | null;
  floorCount?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parking?: number | null;
  highlights: string[];
  shortDescription?: string | null;
  fullDescription: string;
  mapUrl?: string | null;
  lineMessage?: string | null;
  isFeatured: boolean;
  isLatest: boolean;
  status: PropertyStatus;
}

type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];

type PropertyWithImages = PropertyRow & {
  property_images?: Database["public"]["Tables"]["property_images"]["Row"][] | null;
};

const PROPERTY_SELECT = `
  *,
  property_images (
    id,
    property_id,
    image_url,
    sort_order,
    alt_text,
    created_at
  )
`;

function mapAdminInputToInsert(input: PropertyAdminInput): Database["public"]["Tables"]["properties"]["Insert"] {
  return {
    code: input.code,
    slug: normalizePropertySlug(input.slug),
    title: input.title,
    purpose: input.purpose,
    property_type: input.propertyType,
    province: input.province,
    district: input.district,
    subdistrict: input.subdistrict ?? null,
    location_text: input.locationText,
    address_text: input.addressText ?? null,
    price: input.price,
    land_area_sqw: input.landAreaSqw ?? null,
    usable_area_sqm: input.usableAreaSqm ?? null,
    floor_count: input.floorCount ?? null,
    bedrooms: input.bedrooms ?? null,
    bathrooms: input.bathrooms ?? null,
    parking: input.parking ?? null,
    highlights: input.highlights,
    short_description: input.shortDescription ?? null,
    full_description: input.fullDescription,
    map_url: input.mapUrl ?? null,
    line_message: input.lineMessage ?? null,
    is_featured: input.isFeatured,
    is_latest: input.isLatest,
    status: input.status,
  };
}

export async function getAdminProperties(): Promise<Property[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .order("updated_at", { ascending: false });

    if (error) {
      return [];
    }

    return (data ?? []).map((row) => mapProperty(row as unknown as PropertyWithImages));
  } catch {
    return [];
  }
}

export async function getSuggestedPropertyIdentity(title?: string | null): Promise<{ code: string; slug: string }> {
  const code = await getNextPropertyCode();
  const slug = title ? await ensureUniqueSlug(slugifyPropertyTitle(title)) : "";
  return { code, slug };
}

export async function getAdminPropertyById(id: string): Promise<Property | null> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("properties")
      .select(PROPERTY_SELECT)
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return mapProperty(data as unknown as PropertyWithImages);
  } catch {
    return null;
  }
}

async function getNextPropertyCode(): Promise<string> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("properties").select("code");

  if (error) {
    throw new Error(error.message);
  }

  const nextSequence = (data ?? []).reduce((max, row) => {
    const match = row.code.match(/^HM-(\d+)$/i);
    const value = match ? Number(match[1]) : 0;
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0) + 1;

  return formatHmCode(nextSequence);
}

async function ensureUniqueSlug(baseInput: string, excludeId?: string): Promise<string> {
  const supabase = createAdminClient();
  const baseSlug = normalizePropertySlug(baseInput) || "property";
  let attempt = 0;

  while (attempt < 100) {
    const candidate = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
    let query = supabase.from("properties").select("id").eq("slug", candidate).limit(1);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return candidate;
    }

    attempt += 1;
  }

  throw new Error("ไม่สามารถสร้าง slug ที่ไม่ซ้ำได้");
}

export async function createAdminProperty(input: PropertyAdminInput): Promise<Property> {
  const supabase = createAdminClient();
  const normalizedTitle = input.title.trim();
  const nextCode = input.code.trim() || (await getNextPropertyCode());
  const nextSlug = await ensureUniqueSlug(input.slug.trim() || normalizedTitle);
  const payload = mapAdminInputToInsert({
    ...input,
    code: nextCode,
    slug: nextSlug,
    title: normalizedTitle,
  });

  const { data, error } = await supabase
    .from("properties")
    .insert(payload)
    .select(PROPERTY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProperty(data as unknown as PropertyWithImages);
}

export async function updateAdminProperty(id: string, input: PropertyAdminInput): Promise<Property> {
  const supabase = createAdminClient();
  const normalizedTitle = input.title.trim();
  const nextCode = input.code.trim();
  const nextSlug = await ensureUniqueSlug(input.slug.trim() || normalizedTitle, id);
  const payload = mapAdminInputToInsert({
    ...input,
    code: nextCode,
    slug: nextSlug,
    title: normalizedTitle,
  });

  const { data, error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", id)
    .select(PROPERTY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProperty(data as unknown as PropertyWithImages);
}

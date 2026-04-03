import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
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
    slug: input.slug,
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

export async function createAdminProperty(input: PropertyAdminInput): Promise<Property> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .insert(mapAdminInputToInsert(input))
    .select(PROPERTY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProperty(data as unknown as PropertyWithImages);
}

export async function updateAdminProperty(id: string, input: PropertyAdminInput): Promise<Property> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .update(mapAdminInputToInsert(input))
    .eq("id", id)
    .select(PROPERTY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProperty(data as unknown as PropertyWithImages);
}

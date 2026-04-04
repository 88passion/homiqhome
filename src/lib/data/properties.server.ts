import { getLatestProperties, getPropertyBySlug as getPropertyBySlugQuery, getPublishedProperties, getRelatedProperties as getRelatedPropertiesQuery } from "@/lib/queries/properties";
import { mapProperty } from "@/lib/supabase/mappers";
import { getDistrictsByProvince, getAllThaiProvinces, sortProvincesByPriority } from "@/lib/constants/thaiLocations";
import type { Property } from "@/types/property";

function isAvailable(property: Property) {
  return property.status !== "sold" && property.status !== "rented";
}

export async function getLatestPropertiesServer(limit = 4): Promise<Property[]> {
  try {
    const { data, error } = await getLatestProperties(limit);
    if (error || !data) {
      return [];
    }
    return data.map(mapProperty).filter(isAvailable).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPublishedPropertiesServer(params: {
  purpose: "buy" | "rent";
  province?: string;
  district?: string;
  propertyType?: Property["propertyType"];
  bedrooms?: number;
  maxPrice?: number;
}): Promise<Property[]> {
  try {
    const { data, error } = await getPublishedProperties({
      purpose: params.purpose,
      province: params.province,
      district: params.district,
      propertyType: params.propertyType,
      bedrooms: params.bedrooms,
      maxPrice: params.maxPrice,
    });

    if (error || !data) {
      return [];
    }

    return data.map(mapProperty).filter(isAvailable);
  } catch {
    return [];
  }
}

export async function getPropertyBySlugServer(slug: string): Promise<Property | undefined> {
  try {
    const { data, error } = await getPropertyBySlugQuery(slug);
    if (error || !data) {
      return undefined;
    }
    return mapProperty(data);
  } catch {
    return undefined;
  }
}

export async function getRelatedPropertiesServer(property: Property, limit = 4): Promise<Property[]> {
  try {
    const { data, error } = await getRelatedPropertiesQuery({
      propertyId: property.id,
      purpose: property.purpose,
      province: property.province,
      limit,
    });

    if (error || !data) {
      return [];
    }

    return data.map(mapProperty).filter(isAvailable);
  } catch {
    return [];
  }
}

export async function getPublishedPropertyProvincesServer(
  purpose: "buy" | "rent"
): Promise<string[]> {
  const properties = await getPublishedPropertiesServer({ purpose });
  const counts = new Map<string, number>();

  properties.forEach((property) => {
    counts.set(property.province, (counts.get(property.province) ?? 0) + 1);
  });

  const boostedByCount = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "th"))
    .map(([province]) => province);

  return sortProvincesByPriority(getAllThaiProvinces(), boostedByCount);
}

export async function getPublishedPropertyDistrictsServer(
  purpose: "buy" | "rent",
  province?: string
): Promise<string[]> {
  if (!province) return [];

  const properties = await getPublishedPropertiesServer({ purpose, province });
  const propertyDistricts = Array.from(new Set(properties.map((property) => property.district))).sort((a, b) =>
    a.localeCompare(b, "th")
  );

  const canonicalDistricts = getDistrictsByProvince(province);
  const merged = Array.from(new Set([...propertyDistricts, ...canonicalDistricts]));

  return merged.sort((a, b) => a.localeCompare(b, "th"));
}

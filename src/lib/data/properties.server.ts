import { getLatestProperties, getPropertyBySlug as getPropertyBySlugQuery, getPublishedProperties, getRelatedProperties as getRelatedPropertiesQuery } from "@/lib/queries/properties";
import { mapProperty } from "@/lib/supabase/mappers";
import { MOCK_PROPERTIES, filterProperties, getPropertyBySlug as getMockPropertyBySlug, getRelatedProperties as getMockRelatedProperties } from "@/lib/data/properties";
import type { Property } from "@/types/property";

function isAvailable(property: Property) {
  return property.status !== "sold" && property.status !== "rented";
}

export async function getLatestPropertiesServer(limit = 4): Promise<Property[]> {
  try {
    const { data, error } = await getLatestProperties(limit);
    if (error || !data || data.length === 0) {
      return MOCK_PROPERTIES.filter((p) => p.isLatest && isAvailable(p)).slice(0, limit);
    }
    return data.map(mapProperty).filter(isAvailable).slice(0, limit);
  } catch {
    return MOCK_PROPERTIES.filter((p) => p.isLatest && isAvailable(p)).slice(0, limit);
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

    if (error || !data || data.length === 0) {
      return filterProperties(params.purpose, {
        propertyType: params.propertyType,
        province: params.province,
        district: params.district,
        bedrooms: params.bedrooms?.toString(),
        maxPrice: params.maxPrice?.toString(),
      });
    }

    return data.map(mapProperty).filter(isAvailable);
  } catch {
    return filterProperties(params.purpose, {
      propertyType: params.propertyType,
      province: params.province,
      district: params.district,
      bedrooms: params.bedrooms?.toString(),
      maxPrice: params.maxPrice?.toString(),
    });
  }
}

export async function getPropertyBySlugServer(slug: string): Promise<Property | undefined> {
  try {
    const { data, error } = await getPropertyBySlugQuery(slug);
    if (error || !data) {
      return getMockPropertyBySlug(slug);
    }
    return mapProperty(data);
  } catch {
    return getMockPropertyBySlug(slug);
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

    if (error || !data || data.length === 0) {
      return getMockRelatedProperties(property.id, property.purpose, limit).filter(isAvailable);
    }

    return data.map(mapProperty).filter(isAvailable);
  } catch {
    return getMockRelatedProperties(property.id, property.purpose, limit).filter(isAvailable);
  }
}

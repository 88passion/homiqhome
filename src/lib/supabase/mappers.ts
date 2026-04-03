import type { Database } from "@/types/database";
import type { Property, PropertyImage } from "@/types/property";

type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
type PropertyImageRow = Database["public"]["Tables"]["property_images"]["Row"];

type PropertyWithImages = PropertyRow & {
  property_images?: PropertyImageRow[] | null;
};

export function mapPropertyImage(row: PropertyImageRow): PropertyImage {
  return {
    id: row.id,
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
    altText: row.alt_text,
  };
}

export function mapProperty(row: PropertyWithImages): Property {
  return {
    id: row.id,
    code: row.code,
    slug: row.slug,
    title: row.title,
    purpose: row.purpose,
    propertyType: row.property_type,
    province: row.province,
    district: row.district,
    subdistrict: row.subdistrict,
    locationText: row.location_text,
    addressText: row.address_text,
    price: Number(row.price),
    landAreaSqw: row.land_area_sqw != null ? Number(row.land_area_sqw) : null,
    usableAreaSqm: row.usable_area_sqm != null ? Number(row.usable_area_sqm) : null,
    floorCount: row.floor_count,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    parking: row.parking,
    highlights: row.highlights ?? [],
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    mapUrl: row.map_url,
    lineMessage: row.line_message,
    images: (row.property_images ?? []).sort((a, b) => a.sort_order - b.sort_order).map(mapPropertyImage),
    isFeatured: row.is_featured,
    isLatest: row.is_latest,
  };
}

import type { Property, PropertyListingCard } from "@/types/property";

function firstImage(property: Property): string {
  return property.images.length > 0 ? property.images[0].imageUrl : "";
}

export function toListingCard(property: Property): PropertyListingCard {
  return {
    id: property.id,
    code: property.code,
    slug: property.slug,
    title: property.title,
    purpose: property.purpose,
    propertyType: property.propertyType,
    province: property.province,
    district: property.district,
    locationText: property.locationText,
    price: property.price,
    landAreaSqw: property.landAreaSqw,
    usableAreaSqm: property.usableAreaSqm,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    parking: property.parking,
    imageUrl: firstImage(property),
    status: property.status,
  };
}

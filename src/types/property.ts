export type PropertyPurpose = "buy" | "rent";
export type PropertyType = "house" | "condo" | "land" | "shophouse";
export type PropertyStatus = "published" | "sold" | "rented" | "draft";

export interface PropertyImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
  altText?: string | null;
}

export interface Property {
  id: string;
  code: string;
  slug: string;
  title: string;
  purpose: PropertyPurpose;
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
  images: PropertyImage[];
  isFeatured: boolean;
  isLatest: boolean;
  status?: PropertyStatus;
}

export interface PropertyListingCard {
  id: string;
  code: string;
  slug: string;
  title: string;
  purpose: PropertyPurpose;
  propertyType: PropertyType;
  province: string;
  district: string;
  locationText: string;
  price: number;
  landAreaSqw?: number | null;
  usableAreaSqm?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  parking?: number | null;
  imageUrl: string;
  status?: PropertyStatus;
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  house: "บ้าน",
  condo: "คอนโด",
  land: "ที่ดิน",
  shophouse: "ทาวน์โฮม",
};

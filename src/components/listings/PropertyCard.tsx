import Image from "next/image";
import Link from "next/link";
import { formatPrice, formatArea } from "@/lib/utils/format";
import type { PropertyListingCard } from "@/types/property";
import { PROPERTY_TYPE_LABELS } from "@/types/property";

interface PropertyCardProps {
  property: PropertyListingCard;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const areaText = formatArea(property.landAreaSqw, property.usableAreaSqm);
  const isUnavailable = property.status === "sold" || property.status === "rented";
  const statusLabel = property.status === "sold" ? "ขายแล้ว" : property.status === "rented" ? "ปล่อยเช่าแล้ว" : null;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white transition-all duration-200 hover:border-black/10 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className={`object-cover transition-transform duration-300 group-hover:scale-[1.02] ${isUnavailable ? "grayscale" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute left-3 top-3 rounded bg-black/75 px-2.5 py-1 text-xs font-medium text-white">
          {property.purpose === "buy" ? "ขาย" : "เช่า"}
        </span>
        <span className="absolute right-3 top-3 rounded bg-white/90 px-2.5 py-1 text-xs font-medium text-black backdrop-blur-sm">
          {PROPERTY_TYPE_LABELS[property.propertyType]}
        </span>
        {statusLabel && (
          <span className="absolute bottom-3 left-3 rounded bg-red-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {statusLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-black/60">{property.code}</p>
        <h3 className="mt-1 line-clamp-2 font-medium text-black group-hover:text-black/90">
          {property.title}
        </h3>
        <p className="mt-1.5 text-sm text-black/70">{property.locationText}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-black/60">
          {property.bedrooms != null && property.bedrooms > 0 && (
            <span>{property.bedrooms} ห้องนอน</span>
          )}
          {property.bathrooms != null && property.bathrooms > 0 && (
            <span>{property.bathrooms} ห้องน้ำ</span>
          )}
          {property.parking != null && property.parking > 0 && (
            <span>{property.parking} ที่จอดรถ</span>
          )}
          {areaText !== "—" && <span>{areaText}</span>}
        </div>
        <p className="mt-3 font-semibold text-black">
          {formatPrice(property.price, property.purpose)}
        </p>
      </div>
    </Link>
  );
}

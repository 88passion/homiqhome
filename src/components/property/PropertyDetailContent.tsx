import { PropertyGallery } from "./PropertyGallery";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { formatPrice } from "@/lib/utils/format";
import { toListingCard } from "@/lib/data/properties";
import { PROPERTY_TYPE_LABELS } from "@/types/property";
import type { Property } from "@/types/property";

const LINE_BASE = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@793umoyk";

function buildLineUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `${LINE_BASE}?text=${encoded}`;
}

interface PropertyDetailContentProps {
  property: Property;
  related: Property[];
}

export function PropertyDetailContent({ property, related }: PropertyDetailContentProps) {
  const lineMessage = property.lineMessage || `สนใจทรัพย์ ${property.code} ${property.title}`;
  const lineUrl = buildLineUrl(lineMessage);
  const isUnavailable = property.status === "sold" || property.status === "rented";
  const statusLabel = property.status === "sold" ? "ทรัพย์นี้ขายแล้ว" : property.status === "rented" ? "ทรัพย์นี้ปล่อยเช่าแล้ว" : null;

  const landArea = property.landAreaSqw != null ? `${property.landAreaSqw.toLocaleString("th-TH")} ตร.ว.` : null;
  const usableArea = property.usableAreaSqm != null ? `${property.usableAreaSqm} ตร.ม.` : null;
  const pricePerSqw = property.landAreaSqw != null && property.landAreaSqw > 0 ? Math.round(property.price / property.landAreaSqw) : null;

  return (
    <main className="min-h-screen bg-white pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images} title={property.title} />
          </div>

          <div className="space-y-5 rounded-2xl border border-black/8 bg-white p-4 shadow-sm md:p-6 lg:sticky lg:top-24 lg:border-0 lg:p-0 lg:shadow-none">
            {statusLabel && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {statusLabel}
              </div>
            )}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">{property.code}</p>
              <h1 className="mt-2 text-2xl font-semibold leading-tight text-black md:text-3xl">
                {property.title}
              </h1>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  {property.purpose === "buy" ? "ขาย" : "เช่า"}
                </span>
                <span className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium text-black">
                  {PROPERTY_TYPE_LABELS[property.propertyType]}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-[var(--muted-bg)] p-4">
              <p className="text-sm text-black/60">ราคา</p>
              <p className="mt-1 text-2xl font-semibold text-black md:text-3xl">
                {formatPrice(property.price, property.purpose)}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-black/75">{property.locationText}</p>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              {property.bedrooms != null && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">ห้องนอน</dt>
                  <dd className="mt-1 font-medium text-black">{property.bedrooms}</dd>
                </div>
              )}
              {property.bathrooms != null && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">ห้องน้ำ</dt>
                  <dd className="mt-1 font-medium text-black">{property.bathrooms}</dd>
                </div>
              )}
              {property.parking != null && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">ที่จอดรถ</dt>
                  <dd className="mt-1 font-medium text-black">{property.parking}</dd>
                </div>
              )}
              {property.floorCount != null && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">จำนวนชั้น</dt>
                  <dd className="mt-1 font-medium text-black">{property.floorCount}</dd>
                </div>
              )}
              {landArea && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">พื้นที่ดิน</dt>
                  <dd className="mt-1 font-medium text-black">{landArea}</dd>
                </div>
              )}
              {pricePerSqw && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">ราคาเฉลี่ยต่อ ตร.ว.</dt>
                  <dd className="mt-1 font-medium text-black">{pricePerSqw.toLocaleString("th-TH")} บาท</dd>
                </div>
              )}
              {usableArea && (
                <div className="rounded-xl border border-black/8 bg-white p-3">
                  <dt className="text-black/55">พื้นที่ใช้สอย</dt>
                  <dd className="mt-1 font-medium text-black">{usableArea}</dd>
                </div>
              )}
            </dl>

            {property.highlights.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-black">จุดเด่น</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {property.highlights.slice(0, 5).map((h) => (
                    <li key={h} className="rounded-full bg-[var(--muted-bg)] px-3 py-1.5 text-sm text-black">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="hidden flex-col gap-3 pt-1 md:flex">
              {isUnavailable ? (
                <a
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
                >
                  <span>ให้เราช่วยหาทรัพย์ใกล้เคียง</span>
                </a>
              ) : (
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#06C755] px-5 py-3 font-medium text-white transition-opacity hover:opacity-90"
                >
                  <span>สอบถามผ่าน LINE</span>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755z" />
                  </svg>
                </a>
              )}
              {property.mapUrl && (
                <a
                  href={property.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 font-medium text-black transition-colors hover:bg-black hover:text-white"
                >
                  <span>ดูแผนที่</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {property.fullDescription && (
          <section className="mt-10 border-t border-black/5 pt-8 md:mt-12 md:pt-10">
            <h2 className="text-lg font-semibold text-black">รายละเอียด</h2>
            <div className="mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-black/85 md:text-base">
              {property.fullDescription}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-black/5 pt-10 md:mt-16 md:pt-12">
            <h2 className="text-xl font-semibold text-black">ทรัพย์ที่เกี่ยวข้อง</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={toListingCard(p)} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-black/55">{property.code} · {property.locationText}</p>
            <p className="truncate text-sm font-semibold text-black">{formatPrice(property.price, property.purpose)}</p>
          </div>
          {isUnavailable ? (
            <a
              href="/contact"
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
            >
              หาทรัพย์ใกล้เคียง
            </a>
          ) : (
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-xl bg-[#06C755] px-4 py-3 text-sm font-medium text-white"
            >
              สอบถามผ่าน LINE
            </a>
          )}
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import { ListingFilters } from "@/components/listings/ListingFilters";
import { Pagination } from "@/components/listings/Pagination";
import { PropertyCard } from "@/components/listings/PropertyCard";
import { getUniqueDistricts, getUniqueProvinces, toListingCard } from "@/lib/data/properties";
import { getPublishedPropertiesServer } from "@/lib/data/properties.server";

const DEFAULT_PAGE_SIZE = 24;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    type?: string;
    province?: string;
    district?: string;
    maxPrice?: string;
    bedrooms?: string;
  }>;
}

export const metadata = {
  title: "เช่าอสังหาริมทรัพย์ | homiqhome",
  description: "รายการอสังหาริมทรัพย์สำหรับเช่า บ้าน คอนโด",
};

export default async function RentPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const pageSize = Math.min(
    96,
    Math.max(24, parseInt(params.pageSize ?? String(DEFAULT_PAGE_SIZE), 10) || DEFAULT_PAGE_SIZE)
  );

  const filters = {
    propertyType: params.type as "house" | "condo" | "land" | "shophouse" | undefined,
    province: params.province,
    district: params.district,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
  };

  const filtered = await getPublishedPropertiesServer({
    purpose: "rent",
    propertyType: filters.propertyType,
    province: filters.province,
    district: filters.district,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms,
  });
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const provinces = getUniqueProvinces("rent");
  const districts = getUniqueDistricts("rent", filters.province ? filters.province : undefined);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10 lg:px-8">
        <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-5 md:items-end md:pb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Rent</p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight text-black md:text-3xl">
              เช่าอสังหาริมทรัพย์
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              รวมรายการเช่าที่อยู่อาศัยที่ค้นหาง่ายขึ้น เหมาะกับคนที่อยากเลือกทำเล งบ และประเภททรัพย์ได้เร็ว
            </p>
          </div>
          <Link
            href="/contact"
            className="hidden rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white md:inline-flex"
          >
            ให้ช่วยหาทรัพย์เช่า
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-black/8 bg-[var(--muted-bg)] p-4 md:mt-8 md:p-6">
          <ListingFilters
            purpose="rent"
            provinces={provinces}
            districts={districts}
            totalCount={totalCount}
            pageSize={pageSize}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-6">
          {pageItems.map((p) => (
            <PropertyCard key={p.id} property={toListingCard(p)} />
          ))}
        </div>

        {pageItems.length === 0 && (
          <div className="py-16 text-center text-black/70">
            ไม่พบรายการที่ตรงกับเงื่อนไข ลองปรับตัวกรองดูครับ
          </div>
        )}

        {totalCount > 0 && (
          <div className="mt-10">
            <Pagination
              purpose="rent"
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>
    </main>
  );
}

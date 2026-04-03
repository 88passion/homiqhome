import Link from "next/link";
import { toListingCard } from "@/lib/data/properties";
import { getLatestPropertiesServer } from "@/lib/data/properties.server";
import { PropertyCard } from "@/components/listings/PropertyCard";

export async function LatestProperties() {
  const items = await getLatestPropertiesServer(4);

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-black md:text-3xl">
          ทรัพย์ล่าสุดจาก homiqhome
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-black/70 md:text-base">
          รายการที่ทีมงานเลือกและอัปเดตล่าสุด เพื่อให้คุณเริ่มดูทรัพย์ที่น่าสนใจได้ทันที
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
          {items.map((p) => (
            <PropertyCard key={p.id} property={toListingCard(p)} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/buy"
            className="inline-block rounded-md border-2 border-black bg-white px-6 py-2.5 font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            ดูทรัพย์ทั้งหมด
          </Link>
        </div>
      </div>
    </section>
  );
}

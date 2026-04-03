import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { PropertyImageManager } from "@/components/admin/PropertyImageManager";
import { getAdminPropertyById } from "@/lib/admin/properties";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);

  return {
    title: property ? `แก้ไข ${property.title} | homiqhome` : "ไม่พบทรัพย์ | homiqhome",
    description: property?.shortDescription ?? "แก้ไขรายการทรัพย์ในระบบหลังบ้าน homiqhome",
  };
}

export default async function EditAdminPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getAdminPropertyById(id);

  if (!property) notFound();

  return (
    <main className="min-h-screen bg-[var(--muted-bg)] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-black">แก้ไขทรัพย์</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              แก้ไขข้อความ ราคา สถานะ และรายละเอียดทั้งหมดของ listing นี้ได้จากหน้าเดียว
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <Link href="/admin/properties" className="text-sm font-medium text-black/70 underline-offset-2 hover:text-black hover:underline">
              กลับไปหน้ารายการทรัพย์
            </Link>
            <Link href={`/properties/${property.slug}`} className="text-sm font-medium text-black/70 underline-offset-2 hover:text-black hover:underline">
              เปิดหน้า public
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <PropertyForm property={property} />
          <PropertyImageManager property={property} />
        </div>
      </div>
    </main>
  );
}

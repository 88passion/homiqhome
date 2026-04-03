import Link from "next/link";
import { getAdminProperties } from "@/lib/admin/properties";
import { PROPERTY_TYPE_LABELS } from "@/types/property";

export const metadata = {
  title: "Property Management | homiqhome",
  description: "จัดการรายการทรัพย์สำหรับเว็บไซต์ homiqhome",
};

const PURPOSE_LABELS = {
  buy: "ขาย",
  rent: "เช่า",
} as const;

const STATUS_STYLES = {
  draft: "bg-zinc-100 text-zinc-700",
  published: "bg-emerald-100 text-emerald-700",
  sold: "bg-rose-100 text-rose-700",
  rented: "bg-sky-100 text-sky-700",
} as const;

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams?: Promise<{ saved?: string; updated?: string }>;
}) {
  const properties = await getAdminProperties();
  const params = searchParams ? await searchParams : {};
  const flashMessage = params.saved
    ? "สร้างรายการทรัพย์สำเร็จ"
    : params.updated
      ? "อัปเดตรายการทรัพย์สำเร็จ"
      : null;

  return (
    <main className="min-h-screen bg-[var(--muted-bg)] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-black">Property Management</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              เพิ่ม แก้ไข และดูรายการทรัพย์ทั้งหมดจากหลังบ้าน ใช้หน้านี้เป็นจุดเริ่มต้นของการลงทรัพย์จริง
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
          >
            + เพิ่มทรัพย์ใหม่
          </Link>
        </div>

        {flashMessage && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            {flashMessage}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
          <div className="border-b border-black/5 bg-black/[0.02] px-5 py-4 text-sm text-black/60">
            ถ้ายังไม่เห็นรายการทรัพย์ แปลว่า environment ปัจจุบันยังไม่มีตารางหรือข้อมูลใน Supabase ชุดนี้ แต่ฟอร์มสร้างทรัพย์สามารถต่อยอดได้แล้ว
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-black/5">
              <thead className="bg-black/[0.03]">
                <tr className="text-left text-xs uppercase tracking-[0.14em] text-black/45">
                  <th className="px-5 py-4 font-medium">ทรัพย์</th>
                  <th className="px-5 py-4 font-medium">ประเภท</th>
                  <th className="px-5 py-4 font-medium">ทำเล</th>
                  <th className="px-5 py-4 font-medium">ราคา</th>
                  <th className="px-5 py-4 font-medium">สถานะ</th>
                  <th className="px-5 py-4 font-medium text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-sm text-black">
                {properties.map((property) => (
                  <tr key={property.id} className="align-top">
                    <td className="px-5 py-4">
                      <div className="font-medium text-black">{property.title}</div>
                      <div className="mt-1 text-xs text-black/55">{property.code} · /properties/{property.slug}</div>
                    </td>
                    <td className="px-5 py-4 text-black/70">
                      <div>{PURPOSE_LABELS[property.purpose]}</div>
                      <div className="mt-1 text-xs text-black/55">{PROPERTY_TYPE_LABELS[property.propertyType]}</div>
                    </td>
                    <td className="px-5 py-4 text-black/70">
                      <div>{property.locationText}</div>
                      <div className="mt-1 text-xs text-black/55">
                        {property.district}, {property.province}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium">{property.price.toLocaleString("th-TH")} บาท</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[property.status ?? "draft"]}`}>
                        {property.status ?? "draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/properties/${property.slug}`} className="text-sm text-black/60 underline-offset-2 hover:text-black hover:underline">
                          ดูหน้าเว็บ
                        </Link>
                        <Link href={`/admin/properties/${property.id}`} className="text-sm font-medium text-black underline-offset-2 hover:underline">
                          แก้ไข
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {properties.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-black/65">ยังไม่มีรายการทรัพย์ในระบบ กด “เพิ่มทรัพย์ใหม่” เพื่อเริ่มต้น</div>
          )}
        </div>
      </div>
    </main>
  );
}

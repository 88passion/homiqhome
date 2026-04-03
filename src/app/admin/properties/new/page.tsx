import Link from "next/link";
import { PropertyForm } from "@/components/admin/PropertyForm";

export const metadata = {
  title: "เพิ่มทรัพย์ใหม่ | homiqhome",
  description: "สร้างรายการทรัพย์ใหม่ในระบบหลังบ้าน homiqhome",
};

export default function NewAdminPropertyPage() {
  return (
    <main className="min-h-screen bg-[var(--muted-bg)] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-black">เพิ่มทรัพย์ใหม่</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/70 md:text-base">
              กรอกข้อมูลทรัพย์เพื่อสร้าง listing ใหม่ในระบบ หลังจากบันทึกแล้วค่อยกลับมาเพิ่มรูปในรอบถัดไป
            </p>
          </div>
          <Link href="/admin/properties" className="text-sm font-medium text-black/70 underline-offset-2 hover:text-black hover:underline">
            กลับไปหน้ารายการทรัพย์
          </Link>
        </div>

        <PropertyForm />
      </div>
    </main>
  );
}

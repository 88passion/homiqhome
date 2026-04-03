import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getAdminSession } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin Login | homiqhome",
  description: "เข้าสู่ระบบหลังบ้าน homiqhome",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[var(--muted-bg)] py-14 md:py-20">
      <div className="mx-auto max-w-md px-4 md:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold text-black">เข้าสู่ระบบหลังบ้าน</h1>
          <p className="mt-3 text-sm leading-relaxed text-black/70 md:text-base">
            ใช้อีเมลและรหัสผ่านจาก Supabase Auth เพื่อเข้าจัดการทรัพย์และคอนเทนต์
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}

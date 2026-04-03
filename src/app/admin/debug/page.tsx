import { AuthDebugPanel } from "@/components/admin/AuthDebugPanel";
import { getAdminAuthDebugInfo } from "@/lib/admin/auth";

export const metadata = {
  title: "Admin Auth Debug | homiqhome",
  description: "สถานะ debug สำหรับ auth ของหลังบ้าน",
};

export default async function AdminDebugPage() {
  const debug = await getAdminAuthDebugInfo();

  return (
    <main className="min-h-screen bg-[var(--muted-bg)] py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-black">Admin Auth Debug</h1>
        <p className="mt-3 text-sm leading-relaxed text-black/70 md:text-base">
          ใช้หน้านี้เพื่อตรวจว่า server ฝั่ง Vercel เห็น user จาก Supabase session และจับคู่กับ admin_users ได้หรือยัง
        </p>
        <AuthDebugPanel title="Admin route auth debug" debug={debug} />
      </div>
    </main>
  );
}

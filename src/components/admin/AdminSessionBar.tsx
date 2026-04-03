import { logoutAction } from "@/app/login/actions";
import type { AdminSessionInfo } from "@/lib/admin/auth";

export function AdminSessionBar({ session }: { session: AdminSessionInfo }) {
  return (
    <section className="border-b border-black/8 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="text-sm text-black/70">
          เข้าสู่ระบบแล้ว{session.email ? ` · ${session.email}` : ""} · สิทธิ์ {session.role}
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center rounded-xl border border-black/10 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            ออกจากระบบ
          </button>
        </form>
      </div>
    </section>
  );
}

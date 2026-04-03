import { getAdminReadinessReport } from "@/lib/admin/readiness";

export function AdminReadinessBanner() {
  const report = getAdminReadinessReport();

  return (
    <section className="border-b border-amber-200 bg-amber-50/80">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-900/70">Admin readiness</p>
            <h2 className="mt-1 text-lg font-semibold text-amber-950">หลังบ้านเริ่มใช้งานได้แล้ว แต่ยังมีงาน production ที่ควรปิดให้ครบ</h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-3 py-1 font-medium ${report.hasSupabaseUrl ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              SUPABASE URL {report.hasSupabaseUrl ? "พร้อม" : "ยังขาด"}
            </span>
            <span className={`rounded-full px-3 py-1 font-medium ${report.hasPublishableKey ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              PUBLISHABLE KEY {report.hasPublishableKey ? "พร้อม" : "ยังขาด"}
            </span>
            <span className={`rounded-full px-3 py-1 font-medium ${report.hasServiceRoleKey ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              SERVICE ROLE {report.hasServiceRoleKey ? "พร้อม" : "ยังขาด"}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              AUTH {report.authConfigured ? "พร้อม" : "ยังไม่เปิด"}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              BUCKET {report.bucketConfigured ? "พร้อม" : "ต้องสร้าง property-images"}
            </span>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-amber-950/85">
          {report.warnings.map((warning) => (
            <li key={warning} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-700" />
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

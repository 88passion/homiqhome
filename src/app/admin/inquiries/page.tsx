import { updateInquiryStatusAction } from "@/app/admin/inquiries/actions";
import { getAdminInquiries } from "@/lib/admin/inquiries";

const STATUS_STYLES = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-sky-100 text-sky-700",
  closed: "bg-emerald-100 text-emerald-700",
} as const;

const STATUS_LABELS = {
  new: "ใหม่",
  contacted: "ติดต่อแล้ว",
  closed: "ปิดแล้ว",
} as const;

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-14 md:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-black">รายการสอบถาม</h1>
      <p className="mt-3 text-black/70">ดูรายการสอบถามและคำขอฝากขายที่ส่งเข้ามา พร้อมเปลี่ยนสถานะติดตามงานได้จากหน้านี้</p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 && (
          <div className="rounded-2xl border border-black/8 bg-white px-6 py-10 text-center text-sm text-black/65 shadow-sm">
            ยังไม่มีรายการสอบถามเข้ามาในระบบ
          </div>
        )}

        {inquiries.map((inquiry) => (
          <section key={inquiry.id} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[inquiry.status]}`}>
                    {STATUS_LABELS[inquiry.status]}
                  </span>
                  <span className="text-xs text-black/45">{new Date(inquiry.created_at).toLocaleString("th-TH")}</span>
                </div>
                <h2 className="text-lg font-semibold text-black">{inquiry.name}</h2>
                <div className="text-sm text-black/70">เบอร์: {inquiry.phone}</div>
                {inquiry.email && <div className="text-sm text-black/70">อีเมล: {inquiry.email}</div>}
                {inquiry.line_id && <div className="text-sm text-black/70">LINE: {inquiry.line_id}</div>}
                <div className="text-sm text-black/70">ประเภท: {inquiry.inquiry_type}</div>
                {inquiry.source_page && <div className="text-sm text-black/70">มาจากหน้า: {inquiry.source_page}</div>}
              </div>

              <div className="flex flex-wrap gap-2">
                <form action={updateInquiryStatusAction.bind(null, inquiry.id, "new")}>
                  <button type="submit" className="rounded-lg border border-amber-200 px-3 py-2 text-xs font-medium text-amber-800 hover:bg-amber-500 hover:text-white">ตั้งเป็นใหม่</button>
                </form>
                <form action={updateInquiryStatusAction.bind(null, inquiry.id, "contacted")}>
                  <button type="submit" className="rounded-lg border border-sky-200 px-3 py-2 text-xs font-medium text-sky-700 hover:bg-sky-500 hover:text-white">ติดต่อแล้ว</button>
                </form>
                <form action={updateInquiryStatusAction.bind(null, inquiry.id, "closed")}>
                  <button type="submit" className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-600 hover:text-white">ปิดงาน</button>
                </form>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--muted-bg)] p-4 text-sm leading-relaxed text-black/80">
              {inquiry.message}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

import { saveFaqAction } from "@/app/admin/faqs/actions";
import { getAdminFaqs } from "@/lib/admin/content";

export default async function AdminFaqsPage() {
  const faqs = await getAdminFaqs();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-14 md:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-black">คำถามพบบ่อย</h1>
      <p className="mt-3 text-black/70">เพิ่ม แก้ไข และจัดลำดับ FAQ ที่จะไปแสดงบนหน้าเว็บไซต์ได้จากที่นี่</p>

      <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black">เพิ่ม FAQ ใหม่</h2>
        <form action={saveFaqAction.bind(null, null)} className="mt-5 grid grid-cols-1 gap-4">
          <input name="question" placeholder="คำถาม" className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <textarea name="answer" placeholder="คำตอบ" rows={5} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <input name="sortOrder" type="number" defaultValue={faqs.length + 1} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <label className="inline-flex items-center gap-3 text-sm text-black">
            <input type="checkbox" name="isPublished" className="h-4 w-4" defaultChecked />
            เผยแพร่ทันที
          </label>
          <button type="submit" className="inline-flex w-fit rounded-xl bg-black px-5 py-3 text-sm font-medium text-white">บันทึก FAQ</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {faqs.map((faq) => (
          <details key={faq.id} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-black">{faq.question}</h3>
                <span className={`rounded-full px-3 py-1 text-sm ${faq.is_published ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"}`}>
                  {faq.is_published ? "เผยแพร่แล้ว" : "แบบร่าง"}
                </span>
              </div>
            </summary>
            <form action={saveFaqAction.bind(null, faq.id)} className="mt-5 grid grid-cols-1 gap-4">
              <input name="question" defaultValue={faq.question} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <textarea name="answer" defaultValue={faq.answer} rows={5} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <input name="sortOrder" type="number" defaultValue={faq.sort_order} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <label className="inline-flex items-center gap-3 text-sm text-black">
                <input type="checkbox" name="isPublished" defaultChecked={faq.is_published} className="h-4 w-4" />
                เผยแพร่ FAQ นี้
              </label>
              <button type="submit" className="inline-flex w-fit rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white">บันทึกการแก้ไข</button>
            </form>
          </details>
        ))}
      </section>
    </main>
  );
}

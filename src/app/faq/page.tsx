import { getPublishedFaqsServer } from "@/lib/data/content.server";

export const metadata = {
  title: "FAQ | homiqhome",
  description: "คำถามที่พบบ่อยเกี่ยวกับการซื้อ เช่า นัดดูทรัพย์ และการใช้งานเว็บไซต์ homiqhome",
};

export default async function FAQPage() {
  const faqs = await getPublishedFaqsServer();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">คำถามที่พบบ่อย</h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            รวมคำถามที่คนมักสอบถามเกี่ยวกับการนัดดูทรัพย์ การคัดทรัพย์ และการวางแผนเบื้องต้นก่อนตัดสินใจ
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.id} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-lg font-semibold text-black">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-black/70 md:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { getPublishedArticlesServer } from "@/lib/data/content.server";

export const metadata = {
  title: "บทความ | homiqhome",
  description: "บทความ เคล็ดลับ และความรู้เกี่ยวกับการเลือกซื้อ เช่า และวางแผนอสังหาริมทรัพย์",
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticlesServer();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">บทความและเคล็ดลับ</h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            ความรู้เบื้องต้นสำหรับคนที่กำลังมองหาบ้าน คอนโด ที่ดิน หรือวางแผนเรื่องสินเชื่อและการตัดสินใจซื้อทรัพย์
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Article</p>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-black">{article.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{article.excerpt}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-black">
                  อ่านต่อ
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

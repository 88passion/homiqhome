import Link from "next/link";
import { saveArticleAction } from "@/app/admin/articles/actions";
import { getAdminArticles } from "@/lib/admin/content";

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-14 md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-black">บทความ</h1>
          <p className="mt-3 text-black/70">สร้าง แก้ไข และเผยแพร่บทความจากหลังบ้านได้ในหน้าเดียว</p>
        </div>
      </div>

      <section className="mt-8 rounded-3xl border border-black/8 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black">เพิ่มบทความใหม่</h2>
        <form action={saveArticleAction.bind(null, null)} className="mt-5 grid grid-cols-1 gap-4">
          <input name="title" placeholder="ชื่อบทความ" className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <input name="slug" placeholder="slug" className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <input name="coverImageUrl" placeholder="ลิงก์รูปปก (ไม่บังคับ)" className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <textarea name="excerpt" placeholder="คำเกริ่นสั้น" rows={3} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <textarea name="content" placeholder="เนื้อหาบทความ" rows={8} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <label className="inline-flex items-center gap-3 text-sm text-black">
            <input type="checkbox" name="isPublished" className="h-4 w-4" />
            เผยแพร่ทันที
          </label>
          <button type="submit" className="inline-flex w-fit rounded-xl bg-black px-5 py-3 text-sm font-medium text-white">บันทึกบทความ</button>
        </form>
      </section>

      <section className="mt-8 space-y-4">
        {articles.map((article) => (
          <details key={article.id} className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black">{article.title}</h3>
                  <p className="mt-1 text-sm text-black/55">/articles/{article.slug}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`rounded-full px-3 py-1 ${article.is_published ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-700"}`}>
                    {article.is_published ? "เผยแพร่แล้ว" : "แบบร่าง"}
                  </span>
                  <Link href={`/articles/${article.slug}`} className="text-black/60 underline-offset-2 hover:text-black hover:underline">ดูหน้าเว็บ</Link>
                </div>
              </div>
            </summary>
            <form action={saveArticleAction.bind(null, article.id)} className="mt-5 grid grid-cols-1 gap-4">
              <input name="title" defaultValue={article.title} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <input name="slug" defaultValue={article.slug} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <input name="coverImageUrl" defaultValue={article.cover_image_url ?? ""} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <textarea name="excerpt" defaultValue={article.excerpt ?? ""} rows={3} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <textarea name="content" defaultValue={article.content} rows={8} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
              <label className="inline-flex items-center gap-3 text-sm text-black">
                <input type="checkbox" name="isPublished" defaultChecked={article.is_published} className="h-4 w-4" />
                เผยแพร่บทความนี้
              </label>
              <button type="submit" className="inline-flex w-fit rounded-xl border border-black/10 px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white">บันทึกการแก้ไข</button>
            </form>
          </details>
        ))}
      </section>
    </main>
  );
}

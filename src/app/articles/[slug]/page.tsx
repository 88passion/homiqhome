import { notFound } from "next/navigation";
import { getPublishedArticleBySlugServer } from "@/lib/data/content.server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlugServer(slug);

  if (!article) {
    return { title: "ไม่พบบทความ | homiqhome" };
  }

  return {
    title: `${article.title} | homiqhome`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlugServer(slug);

  if (!article) notFound();

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Article</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-black md:text-4xl">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            {article.excerpt}
          </p>
        )}
        <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-black/85">
          {article.content}
        </div>
      </article>
    </main>
  );
}

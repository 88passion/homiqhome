import { getPublishedArticleBySlug, getPublishedArticles, getPublishedFaqs } from "@/lib/queries/content";
import type { Database } from "@/types/database";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];
type FaqRow = Database["public"]["Tables"]["faqs"]["Row"];

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: "a1",
    slug: "how-to-choose-a-home",
    title: "วิธีเลือกบ้านให้เหมาะกับการอยู่อาศัยจริง",
    excerpt: "เริ่มจากทำเล งบประมาณ และรูปแบบการใช้ชีวิตที่สอดคล้องกัน",
    content: "บทความตัวอย่างเกี่ยวกับการเลือกบ้านให้เหมาะกับการอยู่อาศัยจริง",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "a2",
    slug: "before-buying-condo",
    title: "เช็กลิสต์ก่อนซื้อคอนโด",
    excerpt: "สิ่งที่ควรดูทั้งเรื่องทำเล งบ สภาพแวดล้อม และค่าใช้จ่ายแฝง",
    content: "บทความตัวอย่างเกี่ยวกับเช็กลิสต์ก่อนซื้อคอนโด",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "a3",
    slug: "first-home-loan-guide",
    title: "วางแผนสินเชื่อบ้านสำหรับผู้ซื้อครั้งแรก",
    excerpt: "ทำความเข้าใจเรื่องรายได้ ค่างวด เงินดาวน์ และภาระผ่อนที่เหมาะสม",
    content: "บทความตัวอย่างเกี่ยวกับการวางแผนสินเชื่อบ้าน",
    publishedAt: new Date().toISOString(),
  },
];

const MOCK_FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "นัดดูทรัพย์อย่างไร",
    answer: "สามารถติดต่อทีมงานผ่าน LINE เพื่อแจ้งทรัพย์ที่สนใจและเวลาที่สะดวกได้เลย",
    sortOrder: 1,
  },
  {
    id: "f2",
    question: "ช่วยคัดทรัพย์ตามงบได้ไหม",
    answer: "ได้ สามารถบอกงบ ทำเล และประเภททรัพย์ที่ต้องการ แล้วทีมงานจะช่วยคัดรายการที่เหมาะสมให้",
    sortOrder: 2,
  },
  {
    id: "f3",
    question: "คำนวณสินเชื่อในเว็บเป็นตัวเลขจริงไหม",
    answer: "เป็นการประเมินเบื้องต้นเพื่อช่วยวางแผน ตัวเลขจริงอาจเปลี่ยนตามเงื่อนไขธนาคารและข้อมูลผู้กู้",
    sortOrder: 3,
  },
  {
    id: "f4",
    question: "สามารถสอบถามหลายทรัพย์พร้อมกันได้ไหม",
    answer: "ได้ สามารถส่งลิงก์หรือรหัสทรัพย์หลายรายการมาทาง LINE เพื่อให้ทีมงานช่วยเปรียบเทียบให้ได้",
    sortOrder: 4,
  },
];

export async function getPublishedArticlesServer(): Promise<ArticleItem[]> {
  try {
    const { data, error } = await getPublishedArticles();
    const rows = data as ArticleRow[] | null;
    if (error || !rows || rows.length === 0) return MOCK_ARTICLES;
    return rows.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt ?? "",
      content: item.content,
      coverImageUrl: item.cover_image_url,
      publishedAt: item.published_at,
    }));
  } catch {
    return MOCK_ARTICLES;
  }
}

export async function getPublishedArticleBySlugServer(slug: string): Promise<ArticleItem | undefined> {
  try {
    const { data, error } = await getPublishedArticleBySlug(slug);
    const row = data as ArticleRow | null;
    if (error || !row) return MOCK_ARTICLES.find((item) => item.slug === slug);
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? "",
      content: row.content,
      coverImageUrl: row.cover_image_url,
      publishedAt: row.published_at,
    };
  } catch {
    return MOCK_ARTICLES.find((item) => item.slug === slug);
  }
}

export async function getPublishedFaqsServer(): Promise<FaqItem[]> {
  try {
    const { data, error } = await getPublishedFaqs();
    const rows = data as FaqRow[] | null;
    if (error || !rows || rows.length === 0) return MOCK_FAQS;
    return rows.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      sortOrder: item.sort_order,
    }));
  } catch {
    return MOCK_FAQS;
  }
}

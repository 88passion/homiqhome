import Link from "next/link";

export const metadata = {
  title: "Admin | homiqhome",
  description: "Admin panel เบื้องต้นสำหรับจัดการทรัพย์และข้อมูลเว็บไซต์ homiqhome",
};

const ADMIN_LINKS = [
  { title: "Property Management", href: "/admin/properties", description: "เพิ่ม แก้ไข และจัดการรายการทรัพย์" },
  { title: "Inquiries", href: "/admin/inquiries", description: "ดูรายการสอบถามและคำขอฝากขายที่ส่งเข้ามา" },
  { title: "Articles", href: "/admin/articles", description: "จัดการบทความและคอนเทนต์เว็บไซต์" },
  { title: "FAQs", href: "/admin/faqs", description: "แก้ไขคำถามที่พบบ่อยและข้อมูลช่วยตัดสินใจ" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Admin</p>
          <h1 className="mt-3 text-3xl font-semibold text-black md:text-4xl">homiqhome admin</h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            โครงหลังบ้านสำหรับจัดการทรัพย์ รายการสอบถาม บทความ และ FAQ ตอนนี้ property CRUD และ image upload เริ่มมีแล้ว
            ส่วน auth, bucket setup และสิทธิ์ admin จริงยังต้องปิดงานให้ครบก่อนใช้งานกับทีมงานเต็มตัว
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
            {ADMIN_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="text-lg font-semibold text-black">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{item.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-black">
                  เปิดหน้า
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

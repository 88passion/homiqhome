const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@793umoyk";

const CONTACT_CHANNELS = [
  {
    title: "โทรศัพท์",
    description: "0952560205",
    action: "โทรเลย",
    href: "tel:0952560205",
  },
  {
    title: "LINE",
    description: "@793umoyk",
    action: "เปิด LINE",
    href: LINE_URL,
  },
  {
    title: "Email",
    description: "homiqhome88@gmail.com",
    action: "ส่งอีเมล",
    href: "mailto:homiqhome88@gmail.com",
  },
  {
    title: "WeChat",
    description: "garage1990",
    action: "คัดลอก WeChat ID",
    href: "#wechat-garage1990",
  },
];

export const metadata = {
  title: "ติดต่อ | homiqhome",
  description: "ติดต่อ homiqhome เพื่อสอบถามทรัพย์ นัดดูทรัพย์ หรือส่งความต้องการให้ช่วยคัดทรัพย์",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">ติดต่อ homiqhome</h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            หากสนใจทรัพย์ ต้องการให้ช่วยคัดรายการ หรืออยากเริ่มคุยเรื่องงบและทำเล
            สามารถติดต่อทีมงานได้โดยตรงผ่านช่องทางด้านล่าง
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black/90 md:text-base"
          >
            คุยผ่าน LINE ตอนนี้
          </a>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
            {CONTACT_CHANNELS.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-black">{item.title}</h2>
                <p className="mt-3 break-all text-sm leading-relaxed text-black/70">{item.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-black">
                  {item.action}
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-black/8 bg-[var(--muted-bg)] p-6 text-sm leading-relaxed text-black/70 md:p-8 md:text-base">
            <p className="font-medium text-black">ข้อมูลติดต่อ</p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <p><span className="font-medium text-black">โทร:</span> 0952560205</p>
              <p><span className="font-medium text-black">LINE:</span> @793umoyk</p>
              <p><span className="font-medium text-black">Email:</span> homiqhome88@gmail.com</p>
              <p><span className="font-medium text-black">WeChat:</span> garage1990</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

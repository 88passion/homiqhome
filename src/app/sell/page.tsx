import { SellInquiryForm } from "@/components/forms/SellInquiryForm";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@793umoyk";

const STEPS = [
  {
    title: "ส่งข้อมูล",
    description: "กรอกแบบฟอร์มหรือติดต่อ LINE ส่งรายละเอียดทรัพย์และความต้องการของคุณ",
  },
  {
    title: "ประเมินและปรึกษา",
    description: "ทีมงานติดต่อกลับเพื่อนัดดูทรัพย์และให้คำแนะนำเรื่องการตั้งราคาและการตลาด",
  },
  {
    title: "ลงประกาศและดูแลจนขายได้",
    description: "เราดูแลการลงประกาศ โฆษณา และเจรจาต่อรองจนถึงวันโอนกรรมสิทธิ์",
  },
];

export const metadata = {
  title: "ฝากขายกับ homiqhome | homiqhome",
  description: "ฝากขายอสังหาริมทรัพย์กับ homiqhome เราให้คำปรึกษาและดูแลจนขายได้",
};

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">ฝากขายกับ homiqhome</h1>
          <p className="mt-4 text-lg text-black/75">
            ต้องการขายบ้าน คอนโด ที่ดิน หรือทาวน์โฮม? เราพร้อมให้คำปรึกษา ดูแลการตลาดและเจรจาจนถึงวันโอน
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#06C755] px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            <span>ติดต่อผ่าน LINE</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755z" />
            </svg>
          </a>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-black">ทำไมควรฝากขายกับเรา</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-black/70">
            ทีมงานมีประสบการณ์ ให้คำปรึกษาตั้งแต่การตั้งราคา การตลาด จนถึงการโอน
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
            <li className="rounded-lg border border-black/5 bg-[var(--muted-bg)] p-6 text-center">
              <h3 className="font-semibold text-black">คำปรึกษาชัดเจน</h3>
              <p className="mt-2 text-sm text-black/70">วิเคราะห์ตลาดและแนะนำราคาที่เหมาะสม</p>
            </li>
            <li className="rounded-lg border border-black/5 bg-[var(--muted-bg)] p-6 text-center">
              <h3 className="font-semibold text-black">โฆษณาและช่องทางครบ</h3>
              <p className="mt-2 text-sm text-black/70">ลงประกาศหลายช่องทาง เพื่อให้เจอผู้ซื้อที่ตรงกับความต้องการ</p>
            </li>
            <li className="rounded-lg border border-black/5 bg-[var(--muted-bg)] p-6 text-center">
              <h3 className="font-semibold text-black">ดูแลจนโอน</h3>
              <p className="mt-2 text-sm text-black/70">ช่วยเจรจาและประสานงานจนถึงวันโอนกรรมสิทธิ์</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[var(--muted-bg)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-black">ขั้นตอนฝากขาย</h2>
          <div className="mx-auto mt-10 max-w-4xl">
            <ol className="space-y-8 md:flex md:gap-8 md:space-y-0">
              {STEPS.map((step, i) => (
                <li key={i} className="flex flex-1 flex-col items-center text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent-beige)] bg-white text-lg font-semibold text-black">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-black">{step.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-black">ส่งรายละเอียดทรัพย์ให้เรา</h2>
            <p className="mt-2 text-black/70">
              กรอกข้อมูลเบื้องต้นเพื่อให้ทีมงานประเมินและติดต่อกลับได้เร็วขึ้น
            </p>
          </div>
          <SellInquiryForm />
        </div>
      </section>
    </main>
  );
}

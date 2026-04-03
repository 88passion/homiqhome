import { MortgageCalculator } from "@/components/forms/MortgageCalculator";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@793umoyk";

export const metadata = {
  title: "คำนวณสินเชื่อ | homiqhome",
  description: "ประเมินวงเงินกู้และค่างวดผ่อนบ้าน คอนโด และอสังหาริมทรัพย์เบื้องต้น",
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-black md:text-4xl">คำนวณสินเชื่อเบื้องต้น</h1>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            ใช้สำหรับประเมินค่างวดและวงเงินกู้คร่าว ๆ ก่อนคุยรายละเอียดต่อ
            เพื่อวางแผนการซื้อบ้าน คอนโด หรือทรัพย์ที่คุณสนใจได้ง่ายขึ้น
          </p>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-md border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white md:text-base"
          >
            คุยต่อผ่าน LINE
          </a>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <MortgageCalculator />
        </div>
      </section>
    </main>
  );
}

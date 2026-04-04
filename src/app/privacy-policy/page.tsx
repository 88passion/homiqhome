export const metadata = {
  title: "นโยบายความเป็นส่วนตัว | homiqhome",
  description: "นโยบายความเป็นส่วนตัวและการใช้คุกกี้ของเว็บไซต์ homiqhome",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-black/5 bg-[var(--muted-bg)] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">Privacy Policy</p>
          <h1 className="mt-3 text-3xl font-semibold text-black md:text-4xl">นโยบายความเป็นส่วนตัว</h1>
          <p className="mt-4 text-sm leading-relaxed text-black/70 md:text-base">
            homiqhome ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน และจะใช้ข้อมูลเท่าที่จำเป็นต่อการให้บริการ การติดต่อกลับ และการปรับปรุงประสบการณ์การใช้งานเว็บไซต์
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-4 md:px-6 lg:px-8">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-black">1. ข้อมูลที่เราอาจเก็บ</h2>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              เมื่อคุณใช้งานเว็บไซต์ หรือติดต่อทีมงานผ่านแบบฟอร์ม/ช่องทางที่เชื่อมกับเว็บไซต์ เราอาจเก็บข้อมูลที่คุณให้ไว้ เช่น ชื่อ เบอร์โทร อีเมล LINE และรายละเอียดความต้องการเกี่ยวกับอสังหาริมทรัพย์ เพื่อใช้ในการติดต่อกลับและให้บริการที่เหมาะสม
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-black">2. วัตถุประสงค์การใช้ข้อมูล</h2>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              ข้อมูลที่ได้รับจะถูกใช้เพื่อการติดต่อกลับ การให้ข้อมูลเกี่ยวกับทรัพย์ การตอบคำถาม การให้คำแนะนำเบื้องต้น รวมถึงการปรับปรุงคุณภาพของเว็บไซต์และการให้บริการของ homiqhome
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-black">3. การใช้คุกกี้</h2>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              เว็บไซต์ homiqhome ใช้คุกกี้ที่จำเป็นต่อการทำงานของระบบ เช่น การรักษาสถานะการเข้าสู่ระบบของผู้ดูแลระบบ และการทำให้ฟังก์ชันสำคัญของเว็บไซต์ทำงานได้อย่างถูกต้อง คุกกี้เหล่านี้เป็นคุกกี้ที่จำเป็นต่อการให้บริการของเว็บไซต์
            </p>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              ณ เวลานี้ เว็บไซต์จะเน้นใช้คุกกี้ที่จำเป็นต่อระบบเป็นหลัก หากในอนาคตมีการใช้งานเครื่องมือวิเคราะห์หรือการตลาดเพิ่มเติม เนื้อหานโยบายนี้จะถูกอัปเดตให้สอดคล้องกับการใช้งานจริง
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-black">4. การเก็บรักษาและการเข้าถึงข้อมูล</h2>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              เราจะเก็บรักษาข้อมูลเท่าที่จำเป็นต่อการดำเนินงานและการให้บริการ และจะจำกัดการเข้าถึงข้อมูลเฉพาะผู้ที่เกี่ยวข้องกับการดูแลระบบ การติดต่อ และการให้บริการลูกค้าเท่านั้น
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-black">5. การติดต่อ</h2>
            <p className="text-sm leading-relaxed text-black/75 md:text-base">
              หากคุณต้องการสอบถามข้อมูลเพิ่มเติมเกี่ยวกับนโยบายความเป็นส่วนตัวหรือการใช้งานข้อมูล สามารถติดต่อ homiqhome ผ่านช่องทางติดต่อที่แสดงอยู่บนเว็บไซต์ได้
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

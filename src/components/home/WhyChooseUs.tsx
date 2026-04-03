const REASONS = [
  {
    title: "ทรัพย์ที่คัดก่อนลง",
    description: "เราเลือกเฉพาะรายการที่ต้องการนำเสนอจริง เพื่อให้คุณใช้เวลาโฟกัสกับทรัพย์ที่น่าสนใจได้มากขึ้น",
  },
  {
    title: "ข้อมูลอ่านง่าย",
    description: "รายละเอียดสำคัญถูกจัดให้ดูง่ายขึ้น ทั้งราคา ทำเล ขนาด และข้อมูลประกอบการตัดสินใจ",
  },
  {
    title: "คุยต่อได้ทันที",
    description: "ถ้าสนใจทรัพย์ใด สามารถติดต่อทีมงานได้ตรงผ่าน LINE และช่องทางติดต่อของเว็บไซต์",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-black md:text-3xl">
          ทำไมหลายคนเริ่มดูทรัพย์กับเรา
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-black/70 md:text-base">
          homiqhome ออกแบบประสบการณ์ให้การค้นหาทรัพย์ชัดเจน อ่านง่าย และติดต่อได้สะดวกขึ้น
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3 md:gap-8">
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="rounded-lg border border-black/5 bg-[var(--muted-bg)] p-8"
            >
              <h3 className="text-lg font-semibold text-black">{r.title}</h3>
              <p className="mt-3 text-black/70">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

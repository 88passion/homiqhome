import Link from "next/link";

const CARDS = [
  {
    title: "ซื้อ",
    description: "บ้าน คอนโด ที่ดิน ทาวน์โฮม พร้อมให้คุณเป็นเจ้าของ",
    href: "/buy",
    cta: "ดูรายการขาย",
  },
  {
    title: "เช่า",
    description: "ที่พักสำหรับการอยู่อาศัยระยะสั้นและระยะยาว",
    href: "/rent",
    cta: "ดูรายการเช่า",
  },
];

export function PropertyChoiceCards() {
  return (
    <section className="bg-[var(--muted-bg)] py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold text-black md:text-3xl">
          เลือกดูทรัพย์ตามความต้องการ
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-black/70 md:text-base">
          เลือกดูรายการซื้อหรือเช่าตามสิ่งที่คุณกำลังมองหา
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-lg border border-black/5 bg-white p-8 transition-all hover:border-[var(--accent-beige)] hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-black">{card.title}</h3>
              <p className="mt-3 flex-1 text-black/70">{card.description}</p>
              <span className="mt-4 inline-flex items-center font-medium text-black group-hover:underline">
                {card.cta}
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

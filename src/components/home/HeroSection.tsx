import Image from "next/image";
import Link from "next/link";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_URL || "https://line.me/R/ti/p/@793umoyk";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80";

const HERO_POINTS = ["คัดทรัพย์เอง", "ข้อมูลชัดเจน", "ติดต่อสะดวกผ่าน LINE"];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden md:min-h-[90vh]">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="บ้านและอสังหาริมทรัพย์"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <div className="relative flex min-h-[85vh] flex-col justify-center px-4 py-16 text-white md:min-h-[90vh] md:px-6 md:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/75 md:text-sm md:tracking-[0.22em]">
            homiqhome
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl">
            ค้นหาทรัพย์ที่ใช่
            <span className="mt-1 block">ในจังหวะที่เหมาะกับคุณ</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:mt-5 md:text-xl">
            รวมบ้าน คอนโด ที่ดิน และทาวน์โฮมที่ทีมงานคัดดูแลเอง พร้อมข้อมูลชัดเจน
            และช่องทางติดต่อที่รวดเร็วสำหรับคนที่อยากตัดสินใจง่ายขึ้น
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/85 sm:text-sm md:mt-8 md:gap-3">
            {HERO_POINTS.map((point) => (
              <span
                key={point}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                {point}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10 md:gap-4">
            <Link
              href="/buy"
              className="w-full rounded-md bg-white px-6 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-white/90 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              ดูทรัพย์สำหรับซื้อ
            </Link>
            <Link
              href="/rent"
              className="w-full rounded-md border-2 border-white bg-white/10 px-6 py-3 text-center text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              ดูทรัพย์สำหรับเช่า
            </Link>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-md border border-white/25 bg-black/20 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-black/30 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              คุยกับเราผ่าน LINE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

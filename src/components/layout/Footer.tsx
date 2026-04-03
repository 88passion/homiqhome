import Link from "next/link";

const FOOTER_LINKS = [
  { label: "หน้าแรก", href: "/" },
  { label: "ซื้อ", href: "/buy" },
  { label: "เช่า", href: "/rent" },
  { label: "ฝากขาย", href: "/sell" },
  { label: "บทความ", href: "/articles" },
  { label: "คำนวณสินเชื่อ", href: "/calculator" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "ติดต่อ", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[var(--muted-bg)]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold text-black">
              homiqhome
            </Link>
            <p className="mt-2 max-w-xs text-sm text-black/70">
              อสังหาริมทรัพย์ บ้าน คอนโด ที่ดิน ทาวน์โฮม
            </p>
          </div>
          <nav>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-black/60">
              เมนู
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-black/80 transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 border-t border-black/5 pt-8 text-center text-sm text-black/60">
          © {new Date().getFullYear()} homiqhome. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

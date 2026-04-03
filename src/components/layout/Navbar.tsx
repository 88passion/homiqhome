"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
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

const MOBILE_NAV_ITEMS = [
  { label: "หน้าแรก", href: "/" },
  { label: "ซื้อ", href: "/buy" },
  { label: "เช่า", href: "/rent" },
  { label: "คำนวณสินเชื่อ", href: "/calculator" },
  { label: "ติดต่อ", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-black transition-opacity hover:opacity-80"
        >
          homiqhome
        </Link>

        <ul className="hidden items-center gap-1 md:flex md:gap-2 lg:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-2 py-1.5 text-sm text-black/90 transition-colors hover:bg-black/5 hover:text-black lg:text-base"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-black md:hidden"
          aria-label="เปิดเมนู"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-white px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1.5">
            {MOBILE_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-black hover:bg-black/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-black/5 pt-3 text-xs text-black/55">
            เมนูเพิ่มเติมอยู่ด้านล่างของแต่ละหน้า
          </div>
        </div>
      )}
    </header>
  );
}

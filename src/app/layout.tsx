import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingLineButton } from "@/components/layout/FloatingLineButton";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "homiqhome | อสังหาริมทรัพย์",
  description:
    "homiqhome - โชว์เคสอสังหาริมทรัพย์ บ้าน คอนโด ที่ดิน ทาวน์โฮม ซื้อ-เช่า ฝากขาย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="min-h-screen bg-white font-sans text-black antialiased">
        <Navbar />
        {children}
        <Footer />
        <FloatingLineButton />
        <Analytics />
      </body>
    </html>
  );
}

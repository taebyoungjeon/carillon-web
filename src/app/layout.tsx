import type { Metadata } from "next";
import { Noto_Sans_KR, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "칼리온 Carillion — Glass & Greenhouse Engineering",
  description:
    "설계부터 시공, AI 제어까지. 온실 전문 설계·시공·에너지 컨설팅 원스톱 솔루션.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${jakartaSans.variable}`}>
      <body className="font-sans text-ink bg-white antialiased">{children}</body>
    </html>
  );
}

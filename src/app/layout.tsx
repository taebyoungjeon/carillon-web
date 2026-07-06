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
    "냉난방 부하 계산부터 온실 견적, 시공, AI 솔루션 적용까지 연결하는 온실 엔지니어링 파트너.",
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

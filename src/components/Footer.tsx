import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.05] py-14 px-6 text-center">
      <Image
        src="/logo.png"
        alt="Carillion"
        width={100}
        height={40}
        className="h-7 w-auto object-contain mx-auto mb-5 opacity-30 brightness-0 invert"
      />
      <p className="text-[12px] text-white/30 tracking-wide">
        &copy; 2026 주식회사 칼리온 Carillion. All rights reserved.
      </p>
      <p className="text-[12px] text-white/20 mt-1.5 tracking-wide">
        금속구조물창호온실공사업 · 설계부터 AI까지, 온실의 모든 것
      </p>
    </footer>
  );
}

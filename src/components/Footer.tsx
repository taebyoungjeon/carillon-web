export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/[0.05] py-14 px-6 text-center">
      {/* 로고 텍스트 */}
      <p className="font-sans text-[18px] font-semibold tracking-[0.2em] text-white/40 mb-6">
        CARILLON
      </p>

      {/* 회사 정보 */}
      <div className="flex flex-col items-center gap-1.5 mb-6">
        <p className="text-[12px] text-white/40 tracking-wide">
          주식회사 칼리온 · 대표 김신애
        </p>
        <p className="text-[12px] text-white/30 tracking-wide">
          대전광역시 유성구 유성대로1184번길 32, 202-1호
        </p>
        <p className="text-[12px] text-white/30 tracking-wide">
          금속구조물창호온실공사업 전문건설
        </p>
      </div>

      {/* 연락처 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-8">
        <a
          href="tel:1600-xxxx"
          className="text-[12px] text-white/30 hover:text-gold transition-colors tracking-wide"
        >
          Tel. 1600-XXXX
        </a>
        <span className="hidden sm:block text-white/10">|</span>
        <a
          href="mailto:contact@carillon.kr"
          className="text-[12px] text-white/30 hover:text-gold transition-colors tracking-wide"
        >
          contact@carillon.kr
        </a>
      </div>

      {/* 카피라이트 */}
      <p className="text-[11px] text-white/20 tracking-wide">
        &copy; 2026 주식회사 칼리온 Carillion. All rights reserved.
      </p>
    </footer>
  );
}

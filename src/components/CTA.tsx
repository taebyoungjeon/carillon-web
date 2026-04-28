export default function CTA() {
  return (
    <section
      id="cta"
      className="relative bg-gold-pale py-28 md:py-36 px-6 md:px-10 text-center overflow-hidden"
    >
      {/* top & bottom gold lines */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold">
          Get Started
        </span>
        <div className="mx-auto mt-5 mb-6 w-10 h-0.5 bg-gold" />

        <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-semibold text-ink leading-tight mb-5">
          온실 한 동의 에너지 비용,<br />얼마나 줄일 수 있을까요?
        </h2>

        <p className="text-[16px] md:text-[17px] text-stone-500 leading-[1.9] mb-12">
          칼리온이 <strong className="font-semibold text-ink">무료 에너지 사전 진단</strong>을 제공합니다.
          <br className="hidden sm:block" />
          현재 도면이나 계획이 있다면 보내주세요 —
          <br className="hidden sm:block" />
          <strong className="font-semibold text-ink">48시간 내</strong> 절감 예상 리포트를 드립니다.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href="mailto:tbj@carillon.kr"
            className="inline-flex items-center justify-center gap-2 bg-ink text-white text-[13px] font-semibold tracking-widest uppercase px-9 py-4 rounded hover:bg-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.15)] group"
          >
            무료 상담 신청하기
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="mailto:tbj@carillon.kr"
            className="inline-flex items-center justify-center gap-2 border border-gold/40 text-gold text-[13px] font-semibold tracking-widest uppercase px-9 py-4 rounded hover:bg-gold hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            이메일 문의
          </a>
        </div>

        {/* contact */}
        <p className="text-[13px] text-stone-400">
          전화 상담:&nbsp;
          <a href="tel:042-863-4035" className="text-ink border-b border-ink/20 hover:text-gold hover:border-gold transition-colors">
            042-863-4035
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;이메일:&nbsp;
          <a href="mailto:tbj@carillon.kr" className="text-ink border-b border-ink/20 hover:text-gold hover:border-gold transition-colors">
            tbj@carillon.kr
          </a>
        </p>
      </div>
    </section>
  );
}

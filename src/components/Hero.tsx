import Image from "next/image";

const stats = [
  { num: "40%", label: "냉난방 비용 절감" },
  { num: "30%", label: "공사 기간 단축" },
  { num: "72h", label: "병충해 조기 감지" },
  { num: "0건", label: "하자 분쟁 건수" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-24"
    >
      {/* subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,90,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,90,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* bottom gold rule */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-px bg-gold" />

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* ── LOGO — 꽉 차게 ── */}
        <div className="animate-fade-up-0 w-full max-w-[520px] md:max-w-[680px] lg:max-w-[780px] mb-10 md:mb-14">
          <Image
            src="/logo.png"
            alt="Carillion Glass & Greenhouse Engineering"
            width={780}
            height={320}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* brand tag */}
        <div className="animate-fade-up-1 flex items-center gap-4 mb-12">
          <span className="block h-px w-14 bg-gold/30" />
          <p className="text-[10px] font-semibold tracking-[0.35em] uppercase text-gold">
            Glass &amp; Greenhouse Engineering
          </p>
          <span className="block h-px w-14 bg-gold/30" />
        </div>

        {/* headline */}
        <h1 className="animate-fade-up-2 font-serif text-[clamp(40px,7vw,80px)] font-extrabold text-ink leading-[1.1] tracking-tight mb-7">
          Not just built.
          <br />
          <span className="text-gold">Engineered.</span>
        </h1>

        {/* sub */}
        <p className="animate-fade-up-3 text-[16px] md:text-[17px] text-stone-500 leading-[1.9] mb-12 max-w-xl">
          설계부터 시공, AI 제어까지 — 3개 업체에 따로 맡기던 온실 구축을
          <br className="hidden sm:block" />
          <strong className="font-semibold text-ink">칼리온 하나로</strong> 끝내세요.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-gold text-white text-[13px] font-semibold tracking-widest uppercase px-8 py-4 rounded hover:bg-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(197,160,90,0.35)] group"
          >
            무료 에너지 진단 신청
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 border border-ink text-ink text-[13px] font-semibold tracking-widest uppercase px-8 py-4 rounded hover:bg-ink hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            서비스 살펴보기
          </a>
        </div>

        {/* stats bar */}
        <div className="animate-fade-up-5 w-full mt-16 md:mt-20 border-t border-b border-stone-100 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-6 px-4 text-center ${
                i < stats.length - 1 ? "border-r border-stone-100" : ""
              }`}
            >
              <p className="font-serif text-[34px] md:text-[38px] font-extrabold text-gold leading-none tracking-tight">
                {s.num}
              </p>
              <p className="text-[11px] text-stone-400 mt-1.5 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

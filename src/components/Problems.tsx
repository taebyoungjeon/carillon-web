"use client";
import { useEffect, useRef } from "react";

const problems = [
  {
    num: "01",
    icon: "🏗️",
    stat: "GREENHOUSE EPC",
    title: "온실 컨설팅·설계·시공을\n하나의 흐름으로",
    desc: "금속구조물·창호·온실공사 기반의 시공 관점으로 초기 검토, 견적, 설계, EPC 진행 조건을 함께 검토합니다.",
  },
  {
    num: "02",
    icon: "🖥️",
    stat: "AI INFRA",
    title: "AI 인프라 서버와\n고성능 장비 구축",
    desc: "H200, NVIDIA RTX PRO 6000 등 AI 연산 장비 납품 실적을 바탕으로 연구기관·기업의 서버 구축과 장비 조달을 지원합니다.",
  },
];

export default function Problems() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problems" className="bg-offwhite py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* header */}
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="reveal text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold">
            Business Areas
          </span>
          <div className="mx-auto mt-5 mb-6 w-10 h-0.5 bg-gold" />
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-semibold text-ink leading-tight">
            Greenhouse EPC &amp;<br className="hidden sm:block" /> AI Infrastructure
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-stone-500 leading-relaxed max-w-lg mx-auto">
            Engineering, construction, equipment supply, and server deployment for greenhouse and research infrastructure.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i + 1] = el; }}
              className="reveal gold-bar-hover relative bg-white border border-stone-100 rounded-xl p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(0,0,0,0.07)] hover:border-gold/20"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* big ghost number */}
              <span className="font-serif absolute top-2 right-5 text-[72px] font-bold leading-none text-gold/[0.07] select-none">
                {p.num}
              </span>

              {/* icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-xl mb-6">
                {p.icon}
              </div>

              {/* stat badge */}
              <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-gold/10 text-gold px-3.5 py-1.5 rounded-full mb-4">
                {p.stat}
              </span>

              {/* title */}
              <h3 className="font-serif text-[22px] font-semibold text-ink leading-snug mb-3 whitespace-pre-line">
                {p.title}
              </h3>

              {/* desc */}
              <p className="text-[14px] text-stone-500 leading-[1.8]">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

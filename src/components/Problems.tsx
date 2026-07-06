"use client";
import { useEffect, useRef } from "react";

const problems = [
  {
    num: "01",
    icon: "🔥",
    stat: "초기 검토의 기준",
    title: "냉난방 부하가\n계산되지 않는다",
    desc: "면적과 작목만으로 견적을 잡으면 설비 용량, 배관, 전기 인입 조건이 뒤늦게 흔들립니다.",
  },
  {
    num: "02",
    icon: "🔧",
    stat: "견적·시공 분리",
    title: "견적 따로,\n시공 따로",
    desc: "초기 견적과 실제 시공 조건이 맞지 않으면 발주, 자재, 현장 일정이 계속 다시 조정됩니다.",
  },
  {
    num: "03",
    icon: "📊",
    stat: "AI 적용 시점",
    title: "AI 솔루션이\n마지막에 붙는다",
    desc: "센서, 카메라, 제어 데이터를 설계 단계부터 고려하지 않으면 완공 후 자동화 확장이 어렵습니다.",
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
            Pain Points
          </span>
          <div className="mx-auto mt-5 mb-6 w-10 h-0.5 bg-gold" />
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-semibold text-ink leading-tight">
            지금 이런 고민, 하고 계시죠?
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-stone-500 leading-relaxed max-w-lg mx-auto">
            온실 구축 초기에 놓치기 쉬운 세 가지 엔지니어링 문제입니다.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

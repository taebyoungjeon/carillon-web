"use client";
import { useEffect, useRef } from "react";

const problems = [
  {
    num: "01",
    icon: "🔥",
    stat: "운영비의 35~40%",
    title: "냉난방비가\n매출을 잡아먹는다",
    desc: "히트펌프를 설치했지만 연동이 맞지 않아 오히려 전기료가 늘어난 농장이 부지기수입니다.",
  },
  {
    num: "02",
    icon: "🔧",
    stat: "최소 3곳 개별 계약",
    title: "설계 따로, 시공 따로,\n제어 따로",
    desc: "업체 간 책임 떠넘기기가 시작되면, 하자 보수에만 평균 4~6개월이 소요됩니다.",
  },
  {
    num: "03",
    icon: "📊",
    stat: "수확량 편차 최대 20%",
    title: "데이터 없이\n감으로 판단한다",
    desc: '"환기는 몇 도에 열어야 하지?" — 경험과 감에만 의존하면 연간 수확량 편차가 커집니다.',
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
            온실을 짓거나 운영하면서 반복되는 세 가지 구조적 문제입니다.
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

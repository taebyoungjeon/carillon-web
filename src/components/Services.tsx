"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    tag: "Engineering",
    title: "냉난방 부하\n계산",
    desc: "지역, 피복, 규모, 작목, 운영 조건을 기준으로 냉난방 설비 용량과 기본 구축 방향을 검토합니다.",
    kpiNum: "LOAD",
    kpiLabel: "설비 용량 산정 기준",
  },
  {
    tag: "Quote & Build",
    title: "온실 견적·시공",
    desc: "표준 규격 매칭, 자재 구성, 현장 조건을 반영해 견적부터 시공 실행까지 연결합니다.",
    kpiNum: "QUOTE",
    kpiLabel: "견적부터 실행까지",
  },
  {
    tag: "AI Solution",
    title: "AI 솔루션\n적용",
    desc: "센서, 영상, 환경제어 데이터를 기반으로 운영 단계에서 활용 가능한 AI 솔루션 적용안을 설계합니다.",
    kpiNum: "AI",
    kpiLabel: "제어·모니터링 확장",
  },
];

export default function Services() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="bg-ink py-28 md:py-36 px-6 md:px-10 relative"
    >
      {/* top sage divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* header — two-column on desktop */}
        <div
          ref={(el) => { refs.current[0] = el; }}
          className="reveal flex flex-col md:flex-row md:items-end gap-8 md:gap-20 mb-16 md:mb-20"
        >
          <div className="flex-1">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold">
              Our Services
            </span>
            <div className="mt-5 mb-6 w-10 h-0.5 bg-sage" />
            <h2 className="font-serif text-[clamp(30px,4.5vw,52px)] font-semibold text-white leading-tight">
              칼리온이<br />해결합니다
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-[15px] text-white/40 leading-[1.9]">
              부하 계산 · 견적 · 시공 · AI를<br />
              하나의 팀이 책임지는<br />
              온실 엔지니어링 흐름
            </p>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="reveal service-bar-hover relative bg-[#1a1a1a] border border-white/[0.06] rounded-xl p-10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* tag */}
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-gold border border-gold/25 px-4 py-1.5 rounded-full mb-7">
                {s.tag}
              </span>

              {/* title */}
              <h3 className="font-serif text-[26px] font-semibold text-white leading-snug mb-4 whitespace-pre-line">
                {s.title}
              </h3>

              {/* desc */}
              <p className="text-[14px] text-white/40 leading-[1.8] mb-9">{s.desc}</p>

              {/* KPI */}
              <div className="pt-7 border-t border-white/[0.06]">
                <p className="font-serif text-[42px] font-bold text-gold leading-none">{s.kpiNum}</p>
                <p className="text-[12px] text-white/30 mt-2 tracking-wide">{s.kpiLabel}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

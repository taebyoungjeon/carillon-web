"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    tag: "Energy",
    title: "에너지 컨설팅",
    desc: "히트펌프·지열 연동 설계와 에너지 시뮬레이션으로 최적의 냉난방 시스템을 구성합니다.",
    kpiNum: "40%",
    kpiLabel: "냉난방 비용 절감",
  },
  {
    tag: "Automation",
    title: "Greenhouse\nAutomation",
    desc: "3D BIM 기반 설계부터 시공, 환경제어까지 원스톱으로 구축합니다. 하자 분쟁 제로.",
    kpiNum: "30%",
    kpiLabel: "설계~준공 기간 단축",
  },
  {
    tag: "AI Solution",
    title: "AI Image\nMonitoring",
    desc: "작물 영상 분석으로 생육 이상과 병충해를 72시간 전에 조기 감지합니다.",
    kpiNum: "15%",
    kpiLabel: "수확량 편차 이내 안정화",
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
              설계 · 시공 · AI 제어를<br />
              하나의 팀이 책임지는<br />
              원스톱 온실 구축
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

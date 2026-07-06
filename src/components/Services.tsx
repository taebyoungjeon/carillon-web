"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useState } from "react";

const services = [
  {
    tag: "Engineering",
    title: "에너지\n컨설팅",
    desc: "냉난방 부하 계산과 기류 분석을 기반으로 설비 용량, 환기 경로, 기본 구축 방향을 검토합니다.",
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

const simulationInputs = [
  { label: "외기 조건", value: "-8°C / 32°C" },
  { label: "설정 온도", value: "18~26°C" },
  { label: "피복 조건", value: "PO 0.15mm" },
  { label: "환기 요소", value: "측창·천창·팬" },
];

const simulationResults = [
  { label: "예상 부하", value: "118kW", note: "최대 난방 기준" },
  { label: "기류 속도", value: "0.35m/s", note: "작물 생육 구간 평균" },
  { label: "온도 편차", value: "±1.8°C", note: "개선 배치 적용 후" },
  { label: "정체 구간", value: "32%↓", note: "환기 사각지대 감소" },
];

export default function Services() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [energyOpen, setEnergyOpen] = useState(false);

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

              {i === 0 && (
                <button
                  type="button"
                  onClick={() => setEnergyOpen(true)}
                  className="mb-9 inline-flex min-h-11 items-center justify-center rounded border border-gold/35 px-5 text-[12px] font-semibold tracking-widest text-gold transition-all duration-200 hover:bg-gold hover:text-ink"
                >
                  에너지 컨설팅 하기
                </button>
              )}

              {/* KPI */}
              <div className="pt-7 border-t border-white/[0.06]">
                <p className="font-serif text-[42px] font-bold text-gold leading-none">{s.kpiNum}</p>
                <p className="text-[12px] text-white/30 mt-2 tracking-wide">{s.kpiLabel}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {energyOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 px-4 py-5 backdrop-blur-sm md:items-center md:px-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="energy-modal-title"
          onClick={() => setEnergyOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-xl border border-white/10 bg-[#111111] shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Energy Consulting
                </p>
                <h3 id="energy-modal-title" className="mt-1 text-[20px] font-bold text-white md:text-[24px]">
                  유체역학 기반 온실 기류·에너지 분석 예시
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEnergyOpen(false)}
                className="grid h-10 w-10 place-items-center rounded border border-white/15 text-[22px] leading-none text-white/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.35fr_0.85fr]">
              <div className="relative min-h-[260px] bg-black md:min-h-[520px]">
                <Image
                  src="/images/greenhouse-airflow-simulation.png"
                  alt="비닐하우스 내부 기류와 온도 분포 시뮬레이션 예시"
                  fill
                  sizes="(max-width: 768px) 100vw, 62vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between gap-8 border-t border-white/10 p-6 md:border-l md:border-t-0 md:p-8">
                <div>
                  <p className="text-[14px] leading-[1.85] text-white/55">
                    칼리온은 단순 장비 추천이 아니라 온실 내부의 열 이동, 기류 흐름, 환기 경로,
                    설비 용량 조건을 함께 검토해 초기 설계와 견적의 기준을 잡습니다.
                  </p>

                  <div className="mt-7 grid gap-3">
                    {[
                      "일사량, 외기 온도, 피복재, 작목 생육 온도 기준 반영",
                      "측창·천창·순환팬 배치에 따른 기류 흐름과 정체 구간 검토",
                      "난방기·히트펌프 등 설비 용량과 운전 조건 비교",
                      "견적 산출, 시공 범위, AI 제어 적용 기준으로 연결",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded border border-white/10 bg-white/[0.035] px-4 py-3 text-[13px] leading-relaxed text-white/70"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-lg border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                      Simulation Inputs
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {simulationInputs.map((item) => (
                        <div key={item.label} className="rounded border border-white/10 bg-white/[0.03] p-3">
                          <p className="text-[11px] text-white/35">{item.label}</p>
                          <p className="mt-1 text-[14px] font-semibold text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gold/10 p-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
                    Example Output
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {simulationResults.map((item) => (
                      <div key={item.label} className="rounded border border-gold/15 bg-black/20 p-3">
                        <p className="text-[11px] text-white/45">{item.label}</p>
                        <p className="mt-1 font-serif text-[24px] font-bold leading-none text-gold">
                          {item.value}
                        </p>
                        <p className="mt-2 text-[11px] leading-snug text-white/40">{item.note}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[12px] leading-[1.65] text-white/45">
                    위 수치는 온실 규모와 현장 조건에 따라 달라지는 예시값이며, 실제 컨설팅에서는
                    도면·자재·설비 조건을 반영해 산출합니다.
                  </p>
                  <a
                    href="/quote"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded bg-gold px-5 text-[12px] font-bold tracking-widest text-ink transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    온실견적내기 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

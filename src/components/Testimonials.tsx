"use client";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "3곳에 나눠 맡기다 하자 처리에 6개월을 허비했습니다. 칼리온으로 바꾼 뒤, 설계부터 제어까지 한 팀이 책임지니 공사 기간이 4개월 앞당겨졌습니다.",
    name: "김OO",
    role: "충남 논산시 농업인",
    initial: "김",
  },
  {
    quote:
      "에너지 진단 받고 히트펌프 연동을 재설계했더니 첫 겨울 난방비가 전년 대비 38% 줄었습니다. 감으로 하던 환기 타이밍도 AI가 잡아주니 수확량이 눈에 띄게 올랐습니다.",
    name: "박OO",
    role: "경북 상주시 스마트팜혁신밸리 입주 농업인",
    initial: "박",
  },
];

export default function Testimonials() {
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
      { threshold: 0.15 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="bg-white py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">

        {/* header */}
        <div
          ref={(el) => { refs.current[0] = el; }}
          className="reveal text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold">
            Testimonials
          </span>
          <div className="mx-auto mt-5 mb-6 w-10 h-0.5 bg-gold" />
          <h2 className="font-serif text-[clamp(28px,4vw,48px)] font-semibold text-ink leading-tight">
            고객이 직접 경험한 변화
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { refs.current[i + 1] = el; }}
              className="reveal relative bg-offwhite border border-stone-100 rounded-xl p-10 md:p-12 overflow-hidden transition-all duration-300 hover:border-gold/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.05)]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* giant quote mark */}
              <span className="font-serif absolute top-2 left-7 text-[100px] font-bold leading-none text-gold/[0.09] select-none">
                "
              </span>

              {/* quote */}
              <blockquote className="text-[16px] md:text-[17px] font-normal text-ink/75 leading-[1.85] mb-9 relative z-10">
                "{t.quote}"
              </blockquote>

              {/* author */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-full bg-ink text-gold flex items-center justify-center font-serif font-bold text-[18px] flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-ink">{t.name}</p>
                  <p className="text-[12px] text-stone-400 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

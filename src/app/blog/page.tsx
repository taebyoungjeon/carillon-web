"use client";

import { useState } from "react";
import Link from "next/link";
import { posts, categories } from "@/lib/posts";

export default function BlogPage() {
  const [active, setActive] = useState("전체");

  const filtered =
    active === "전체" ? posts : posts.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-white pt-28 pb-32">
      {/* ── 헤더 ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold">
          Insights
        </span>
        <div className="mx-auto mt-4 mb-6 w-10 h-0.5 bg-gold" />
        <h1 className="text-[clamp(28px,4vw,48px)] font-bold text-ink leading-tight tracking-tight mb-4">
          농업 환경제어 기술 인사이트
        </h1>
        <p className="text-stone-500 text-[16px] max-w-xl mx-auto leading-relaxed">
          스마트 온실 설계·에너지·AI 자동화의 최신 기술 정보를
          <br className="hidden md:block" />
          실무 경험 기반으로 전달합니다.
        </p>
      </section>

      {/* ── 카테고리 필터 ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide border transition-all duration-200 ${
                active === cat
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-stone-500 border-stone-200 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── 카드 그리드 ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:border-gold/30 transition-all duration-300"
            >
              {/* 썸네일 */}
              <div
                className="h-44 flex items-center justify-center text-5xl"
                style={{ backgroundColor: post.coverColor }}
              >
                {post.icon}
              </div>

              {/* 본문 */}
              <div className="flex flex-col flex-1 p-6">
                {/* 카테고리 */}
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold mb-3">
                  {post.category}
                </span>

                {/* 제목 */}
                <h2 className="text-[16px] font-bold text-ink leading-snug mb-3 group-hover:text-gold transition-colors duration-200">
                  {post.title}
                </h2>

                {/* 요약 */}
                <p className="text-[13px] text-stone-500 leading-relaxed flex-1 line-clamp-3">
                  {post.summary}
                </p>

                {/* 하단 메타 */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-stone-100">
                  <span className="text-[12px] text-stone-400">{post.date}</span>
                  <span className="text-[12px] text-stone-400">
                    읽기 {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-stone-400">
            해당 카테고리의 글이 없습니다.
          </div>
        )}
      </section>

      {/* ── CTA 배너 ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mt-20">
        <div className="bg-ink rounded-2xl px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-2">
              Free Consulting
            </p>
            <h3 className="text-white text-[20px] md:text-[24px] font-bold leading-snug">
              우리 온실에 맞는 설계,
              <br />
              무료로 진단받아 보세요.
            </h3>
          </div>
          <Link
            href="/#cta"
            className="flex-shrink-0 bg-gold text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-200"
          >
            무료 상담 신청 →
          </Link>
        </div>
      </section>
    </main>
  );
}

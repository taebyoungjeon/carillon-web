import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = posts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 2);

  const allLines = post.body.split("\n");

  return (
    <main className="min-h-screen bg-white pt-28 pb-32">
      <article className="max-w-2xl mx-auto px-6 md:px-10">

        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-[12px] text-stone-400 mb-8">
          <Link href="/blog" className="hover:text-gold transition-colors">블로그</Link>
          <span>/</span>
          <span className="text-gold font-semibold">{post.category}</span>
        </div>

        {/* 헤더 */}
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold">
            {post.category}
          </span>
          <h1 className="mt-3 text-[clamp(24px,3.5vw,38px)] font-bold text-ink leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-5 text-[13px] text-stone-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>읽기 {post.readTime}</span>
          </div>
        </div>

        {/* 커버 */}
        <div
          className="w-full h-52 md:h-64 rounded-2xl flex items-center justify-center text-6xl mb-12"
          style={{ backgroundColor: post.coverColor }}
        >
          {post.icon}
        </div>

        {/* 요약 박스 */}
        <div className="bg-offwhite border-l-4 border-gold rounded-r-xl px-6 py-5 mb-10">
          <p className="text-[14px] text-stone-600 leading-relaxed">{post.summary}</p>
        </div>

        {/* 본문 */}
        <div className="prose-custom">
          {allLines.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-[20px] font-bold text-ink mt-10 mb-4 pb-2 border-b border-stone-100">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-[17px] font-bold text-ink mt-7 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("| ")) {
              return null; // 테이블은 블록 단위로 처리
            }
            if (line.startsWith("1단계") || line.match(/^\d+\./)) {
              return (
                <p key={i} className="text-[15px] text-stone-700 leading-relaxed my-2 pl-4 border-l-2 border-gold/40">
                  {line}
                </p>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="text-[15px] text-stone-700 leading-relaxed my-1 ml-4 list-disc">
                  {line.replace("- ", "")}
                </li>
              );
            }
            if (line.trim() === "") {
              return <div key={i} className="h-3" />;
            }
            // bold 처리
            const boldParts = line.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i} className="text-[15px] text-stone-700 leading-[1.9] my-1">
                {boldParts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j} className="font-bold text-ink">{part}</strong> : part
                )}
              </p>
            );
          })}

          {/* 테이블 렌더링 */}
          {post.body.includes("| ") && (
            <div className="overflow-x-auto my-8 rounded-xl border border-stone-100">
              <table className="w-full text-[13px]">
                <thead className="bg-ink text-white">
                  {post.body.split("\n").filter(l => l.startsWith("| ")).slice(0, 1).map((row, i) => (
                    <tr key={i}>
                      {row.split("|").filter(Boolean).map((cell, j) => (
                        <th key={j} className="px-4 py-3 text-left font-semibold tracking-wide">{cell.trim()}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {post.body.split("\n").filter(l => l.startsWith("| ")).slice(2).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-offwhite"}>
                      {row.split("|").filter(Boolean).map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-stone-700">{cell.trim()}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 구분선 */}
        <div className="my-14 border-t border-stone-100" />

        {/* 관련 글 */}
        {related.length > 0 && (
          <section>
            <h3 className="text-[13px] font-bold tracking-[0.25em] uppercase text-gold mb-6">
              관련 글
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-4 p-5 border border-stone-100 rounded-xl hover:border-gold/40 hover:shadow-sm transition-all duration-200"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: p.coverColor }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-gold font-bold tracking-widest uppercase mb-1">{p.category}</p>
                    <p className="text-[13px] font-semibold text-ink leading-snug group-hover:text-gold transition-colors">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-14 bg-ink rounded-2xl px-8 py-10 text-center">
          <p className="text-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
            Free Consulting
          </p>
          <h3 className="text-white text-[20px] font-bold mb-6 leading-snug">
            내 온실에 이 기술을<br />어떻게 적용할 수 있을까요?
          </h3>
          <Link
            href="/#cta"
            className="inline-block bg-gold text-white font-bold text-[14px] px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-200"
          >
            무료 에너지 진단 신청 →
          </Link>
        </div>

        {/* 목록으로 */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-[13px] text-stone-400 hover:text-gold transition-colors">
            ← 블로그 목록으로
          </Link>
        </div>

      </article>
    </main>
  );
}

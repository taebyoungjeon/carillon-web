"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Wordmark */}
        <Link href="#hero">
          <span className="font-serif text-[18px] font-extrabold tracking-[0.25em] text-ink hover:text-gold transition-colors duration-200 uppercase">
            CARILLON
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#problems", label: "고객 과제" },
            { href: "#services", label: "서비스" },
            { href: "#testimonials", label: "고객 사례" },
            { href: "/blog", label: "블로그" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-stone-500 hover:text-gold transition-colors tracking-wide"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#cta"
            className="text-[12px] font-semibold tracking-widest uppercase bg-ink text-white px-5 py-2.5 rounded hover:bg-gold transition-colors duration-200"
          >
            상담 신청
          </a>
        </div>

        {/* Mobile CTA */}
        <a
          href="#cta"
          className="md:hidden text-[12px] font-semibold tracking-widest uppercase bg-ink text-white px-4 py-2 rounded hover:bg-gold transition-colors"
        >
          상담
        </a>
      </div>
    </nav>
  );
}

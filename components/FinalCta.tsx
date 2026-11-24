"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import SplitWords from "./SplitWords";
import type { Dict, Locale } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// The "bee-line": a curvy path straightens out as you scroll, ending in the CTA.
export default function FinalCta({ lang, d }: { lang: Locale; d: Dict["cta"] }) {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const len = path.current!.getTotalLength();
      gsap.set(path.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path.current, {
        strokeDashoffset: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 80%", end: "center 45%", scrub: true },
      });
      gsap.to(path.current, {
        morphSVG: "M0 160 C 300 160, 900 160, 1200 160", ease: "power2.inOut",
        scrollTrigger: { trigger: root.current, start: "center 55%", end: "center 25%", scrub: true },
      });
      gsap.from(".cta-title .w", {
        yPercent: 115, stagger: 0.08, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".cta-title", start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative overflow-hidden bg-ink px-5 py-32 md:px-10 md:py-48">
      <svg viewBox="0 0 1200 320" aria-hidden className="absolute inset-x-0 top-8 h-auto w-full">
        <path ref={path} d="M0 260 C 200 20, 340 300, 560 150 S 900 20, 1200 160" fill="none" stroke="#ffd21e" strokeWidth="7" strokeLinecap="round" />
      </svg>
      <div className="relative mx-auto max-w-[1300px] pt-40 text-center md:pt-52">
        <SplitWords as="h2" text={d.title} className="cta-title font-display text-[clamp(1.9rem,8vw,7.5rem)] font-black leading-[1]" />
        <p className="mx-auto mt-6 max-w-md text-lg text-white/65">{d.sub}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={`/${lang}/tariffs`} className="rounded-full bg-yellow px-8 py-4 text-sm font-bold text-ink transition hover:scale-105">{d.btn}</Link>
          <a href="#" className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold transition hover:border-yellow hover:text-yellow">{d.btn2}</a>
        </div>
      </div>
    </section>
  );
}

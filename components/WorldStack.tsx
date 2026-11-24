"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

const THEMES = [
  { bg: "bg-yellow text-ink", sub: "text-ink/70" },
  { bg: "bg-paper text-ink", sub: "text-ink/65" },
  { bg: "bg-ink-2 text-paper border border-white/15", sub: "text-white/65" },
  { bg: "bg-yellow text-ink", sub: "text-ink/70" },
];

// Sticky stacking cards: each card shrinks & dims as the next one slides over it.
export default function WorldStack({ d }: { d: Dict["world"] }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return;
        gsap.to(c.querySelector(".stack-inner"), {
          scale: 0.9, opacity: 0.35, ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 90%", end: "top 15%", scrub: true },
        });
      });
      gsap.utils.toArray<SVGElement>(".stack-art").forEach((a) => {
        gsap.fromTo(a, { rotate: -25, scale: 0.8 }, {
          rotate: 25, scale: 1.1, ease: "none",
          scrollTrigger: { trigger: a, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="world" className="relative bg-ink px-5 pb-32 pt-32 md:px-10">
      <div className="mx-auto max-w-[1300px]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow">{d.kicker}</p>
        <h2 className="font-display mt-4 text-[clamp(2.2rem,6vw,5.5rem)] font-black leading-none">{d.title}</h2>
        <div className="mt-16">
          {d.cards.map((c, i) => (
            <div key={c.t} className="stack-card sticky top-24 pb-6 md:top-28" style={{ top: `calc(6rem + ${i * 0.9}rem)` }}>
              <div className={`stack-inner relative grid min-h-[58vh] origin-top items-end overflow-hidden rounded-[2.5rem] p-8 md:grid-cols-2 md:p-14 ${THEMES[i].bg}`}>
                <svg aria-hidden viewBox="0 0 24 24" className="stack-art absolute -right-10 top-1/2 h-[60%] -translate-y-1/2 opacity-[.14] md:right-10 md:h-[85%]"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" fill="none" stroke="currentColor" strokeWidth=".6" /><path d="M12 6l5.2 3v6L12 18l-5.2-3V9z" fill="currentColor" /></svg>
                <span className="font-display absolute left-8 top-8 text-sm font-bold opacity-60 md:left-14 md:top-12">0{i + 1} / 0{d.cards.length}</span>
                <h3 className="font-display relative text-[clamp(2rem,4.6vw,4.2rem)] font-black leading-[1.02]">{c.t}</h3>
                <p className={`relative mt-4 max-w-sm text-base md:mt-0 md:justify-self-end md:text-lg ${THEMES[i].sub}`}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

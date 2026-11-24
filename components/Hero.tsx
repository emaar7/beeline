"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tunnel from "./Tunnel";
import SplitWords from "./SplitWords";
import type { Dict, Locale } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ lang, d }: { lang: Locale; d: Dict["hero"] }) {
  const root = useRef<HTMLElement>(null);
  const speedRef = useRef(0);
  const counter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray<HTMLElement>(".stage");
      const dots = gsap.utils.toArray<HTMLElement>(".dot");
      gsap.set(stages.slice(1), { autoAlpha: 0, y: 60 });

      // intro
      if (!reduce) {
        gsap.from(".stage-0 .w", { yPercent: 115, duration: 1.2, stagger: 0.07, ease: "power4.out", delay: 0.25 });
        gsap.from(".fade-in", { autoAlpha: 0, y: 24, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.7 });
      }

      let progress = 0;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.6,
          onUpdate: (s) => {
            progress = s.progress;
            const idx = progress < 0.3 ? 0 : progress < 0.63 ? 1 : 2;
            dots.forEach((el, i) => el.classList.toggle("is-on", i === idx));
          },
        },
      });
      tl.to(stages[0], { autoAlpha: 0, y: -60, duration: 0.25 }, 0.8)
        .fromTo(stages[1], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.95)
        .to(stages[1], { autoAlpha: 0, y: -60, duration: 0.25 }, 1.85)
        .fromTo(stages[2], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 2.0)
        .to(".hero-scroll", { autoAlpha: 0, duration: 0.2 }, 0.1)
        .to({}, { duration: 0.75 }); // hold final stage

      // speed + counter, smoothed on the ticker; scroll velocity adds a boost
      let lastY = window.scrollY, vel = 0, shown = 0;
      const tick = () => {
        const y = window.scrollY;
        vel += (Math.min(Math.abs(y - lastY) / 60, 1) - vel) * 0.1;
        lastY = y;
        speedRef.current = Math.pow(progress, 1.3) * 0.85 + vel * 0.55;
        const target = Math.round(Math.pow(Math.min(1, progress / 0.62), 1.6) * 1000);
        shown += (target - shown) * 0.12;
        if (counter.current) counter.current.textContent = String(Math.round(shown));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh w-full overflow-hidden bg-ink">
      <div className="absolute inset-0"><Tunnel speedRef={speedRef} /></div>

      {/* top kicker */}
      <div className="fade-in absolute left-5 top-24 flex items-center gap-3 md:left-10 md:top-32">
        <span className="h-2 w-2 animate-pulse rounded-full bg-yellow" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">{d.kicker}</span>
      </div>

      {/* stages */}
      <div className="relative z-10 flex h-full items-center px-5 md:px-10">
        <div className="relative w-full max-w-[1500px]">
          {d.stages.map((s, i) => (
            <div key={i} className={`stage stage-${i} ${i ? "absolute inset-0" : ""} flex flex-col justify-center`}>
              <SplitWords
                as="h1"
                text={s.title}
                className="font-display max-w-[15ch] text-[clamp(2rem,9.5vw,8.5rem)] font-black leading-[0.95] md:max-w-[12ch]"
              />
              <p className="fade-in mt-6 max-w-md text-base text-white/70 md:text-lg">{s.sub}</p>
              {i === 2 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/${lang}/tariffs`} className="rounded-full bg-yellow px-7 py-4 text-sm font-bold text-ink transition hover:scale-105">
                    {d.primary}
                  </Link>
                  <Link href={`/${lang}/internet`} className="rounded-full border border-white/30 px-7 py-4 text-sm font-bold transition hover:border-yellow hover:text-yellow">
                    {d.secondary}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* speedometer */}
      <div className="fade-in absolute bottom-8 right-5 z-10 text-right md:bottom-12 md:right-14">
        <div className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-none tabular-nums text-yellow">
          <span ref={counter}>0</span>
        </div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{d.unit}</div>
      </div>

      {/* stage dots + scroll hint */}
      <div className="absolute bottom-8 left-5 z-10 flex items-center gap-6 md:bottom-12 md:left-10">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`dot h-1.5 w-6 rounded-full bg-white/25 transition-all duration-500 [&.is-on]:w-12 [&.is-on]:bg-yellow ${i === 0 ? "is-on" : ""}`} />
          ))}
        </div>
        <span className="hero-scroll fade-in hidden text-xs uppercase tracking-[0.25em] text-white/50 sm:block">{d.scroll} ↓</span>
      </div>
    </section>
  );
}

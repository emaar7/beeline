"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

const SPEEDS = [42, 150, 1000, 1000]; // Mbit/s, theoretical maxima (generic tech classes)

// Pinned race: each lane's marker travels in proportion to its tech speed (sqrt scale).
export default function SpeedRace({ d }: { d: Dict["speed"] }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 0.7 },
      });
      SPEEDS.forEach((s, i) => {
        const ratio = Math.sqrt(s / 1000);
        // fiber (last) gets a tiny delay so 5G wins the photo finish
        tl.to(`.bee-${i}`, { left: `${ratio * 100}%`, xPercent: -100 * ratio, duration: 1 }, i === 3 ? 0.04 : 0);
        tl.to(`.fill-${i}`, { scaleX: ratio, duration: 1 }, i === 3 ? 0.04 : 0);
      });
      tl.fromTo(".flag", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.15, ease: "back.out(2)" }, 0.9);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="coverage" className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink px-5 py-24 md:px-10">
      <div className="mx-auto w-full max-w-[1300px]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow">{d.kicker}</p>
        <h2 className="font-display mt-4 text-[clamp(2.2rem,6vw,5.5rem)] font-black leading-none">{d.title}</h2>
        <p className="mt-4 max-w-lg text-white/60">{d.sub}</p>

        <div className="relative mt-14 space-y-6 md:space-y-8">
          <div className="flag absolute -right-1 -top-9 text-3xl md:-top-10" aria-hidden>🏁</div>
          {d.tech.map((t, i) => (
            <div key={t} className="grid grid-cols-[4.5rem_1fr] items-center gap-4 md:grid-cols-[9rem_1fr]">
              <div>
                <div className="font-display text-xl font-black md:text-3xl">{t}</div>
                <div className="text-xs text-white/45">≤ {SPEEDS[i]} Mbit/s</div>
              </div>
              <div className="relative h-10 rounded-full bg-white/[.07] md:h-14">
                <div className={`fill-${i} absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full ${i === 2 ? "bg-yellow" : "bg-white/25"}`} />
                <div className={`bee-${i} absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-4 border-ink md:h-14 md:w-14 ${i === 2 ? "bg-yellow" : "bg-paper"}`}>
                  <svg viewBox="0 0 32 32" className="h-full w-full rounded-full"><rect width="32" height="32" fill={i === 2 ? "#ffd21e" : "#f6f3ea"} /><path d="M-4 12 L20 -12 L26 -6 L2 18Z M2 26 L26 2 L32 8 L8 32Z" fill="#0b0b0c" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-white/40">{d.note}</p>
      </div>
    </section>
  );
}

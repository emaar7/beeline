"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileCard } from "./TariffCard";
import { mobilePlans } from "@/lib/data";
import type { Dict, Locale } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

// Desktop: pinned section, cards travel sideways with scroll. Mobile: native snap scroller.
export default function TariffsRail({ lang, d }: { lang: Locale; d: Dict["tariffs"] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (s) => bar.current && (bar.current.style.transform = `scaleX(${s.progress})`),
        },
      });
      gsap.utils.toArray<HTMLElement>(".rail-card").forEach((c) => {
        gsap.fromTo(c, { rotate: 4, y: 40 }, {
          rotate: 0, y: 0, ease: "none",
          scrollTrigger: { trigger: c, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="tariffs" className="relative overflow-hidden bg-paper text-ink lg:h-svh">
      <div className="flex flex-col py-24 lg:h-full lg:justify-center lg:py-0">
        <div ref={track} className="flex flex-col gap-8 lg:w-max lg:flex-row lg:items-center lg:gap-6 lg:pl-[8vw] lg:pr-[10vw]">
          <div className="shrink-0 px-5 lg:w-[34vw] lg:px-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">{d.kicker}</p>
            <h2 className="font-display mt-4 text-[clamp(2.2rem,5vw,4.5rem)] font-black leading-[1]">{d.title}</h2>
            <p className="mt-5 max-w-sm text-ink/70">{d.sub}</p>
            <Link href={`/${lang}/tariffs`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-yellow transition hover:gap-4">
              {d.all} →
            </Link>
          </div>
          <div className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 lg:contents lg:overflow-visible lg:p-0">
            {mobilePlans.map((p) => (
              <div key={p.id} className="rail-card w-[78vw] max-w-[340px] shrink-0 snap-center lg:w-[340px]">
                <MobileCard p={p} d={d} lang={lang} className="h-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-x-[8vw] bottom-10 hidden h-1 rounded-full bg-ink/10 lg:block">
          <div ref={bar} className="h-full origin-left scale-x-0 rounded-full bg-ink" />
        </div>
      </div>
    </section>
  );
}

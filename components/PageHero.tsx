"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Tunnel from "./Tunnel";
import SplitWords from "./SplitWords";

export default function PageHero({ title, sub }: { title: string; sub: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".w", { yPercent: 115, stagger: 0.07, duration: 1.1, ease: "power4.out", delay: 0.1 });
      gsap.from(".ph-sub", { autoAlpha: 0, y: 20, duration: 0.9, delay: 0.5 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink px-5 pb-16 pt-40 md:px-10 md:pb-24">
      <div className="absolute inset-0 opacity-80"><Tunnel baseSpeed={0.3} /></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative mx-auto w-full max-w-[1300px]">
        <SplitWords as="h1" text={title} className="font-display text-[clamp(2.2rem,10vw,9rem)] font-black leading-[0.95]" />
        <p className="ph-sub mt-5 max-w-md text-lg text-white/70">{sub}</p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/dictionaries";

gsap.registerPlugin(ScrollTrigger);

export default function Stats({ d }: { d: Dict["stats"] }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = +el.dataset.count!;
        const o = { v: 0 };
        gsap.to(o, {
          v: to, duration: 1.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(o.v))),
        });
      });
      gsap.from(".stat", { y: 50, autoAlpha: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  const items = [
    { n: 14, l: d.regions },
    { n: 1000, u: "Mbit/s", l: d.speed },
    { t: "5G", l: d.gen },
    { t: "24/7", l: d.support },
  ];
  return (
    <section ref={root} className="bg-paper px-5 py-24 text-ink md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
        {items.map((s, i) => (
          <div key={i} className="stat border-t-2 border-ink pt-5">
            <div className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-none">
              {s.n !== undefined ? <span data-count={s.n}>0</span> : s.t}
              {s.u && <span className="block text-base md:text-xl">{s.u}</span>}
            </div>
            <p className="mt-3 text-sm font-medium text-ink/65">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HomeCard, MobileCard } from "./TariffCard";
import { homePlans, mobilePlans } from "@/lib/data";
import type { Dict, Locale } from "@/lib/dictionaries";

export default function TariffsBrowser({ lang, d, unit }: { lang: Locale; d: Dict["tariffs"]; unit: string }) {
  const [tab, setTab] = useState<"mobile" | "home">("mobile");
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(grid.current!.children, { y: 60, autoAlpha: 0, stagger: 0.09, duration: 0.8, ease: "power3.out" });
      gsap.from("[data-bar]", { scaleX: 0, duration: 1.1, delay: 0.3, ease: "power3.out" });
    }, grid);
    return () => ctx.revert();
  }, [tab]);

  return (
    <div>
      <div className="inline-flex rounded-full border border-white/15 p-1">
        {(["mobile", "home"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${tab === k ? "bg-yellow text-ink" : "text-white/70 hover:text-white"}`}>
            {d.tabs[k]}
          </button>
        ))}
      </div>
      <div key={tab} ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tab === "mobile"
          ? mobilePlans.map((p) => <MobileCard key={p.id} p={p} d={d} lang={lang} />)
          : homePlans.map((p) => <HomeCard key={p.id} p={p} d={d} unit={unit} lang={lang} />)}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { fmtPrice, pickPlan } from "@/lib/data";
import type { Dict, Locale } from "@/lib/dictionaries";

export default function TariffFinder({ lang, d }: { lang: Locale; d: Dict["tariffs"] }) {
  const [gb, setGb] = useState(15);
  const [min, setMin] = useState(500);
  const plan = pickPlan(gb, min);
  const price = useRef<HTMLSpanElement>(null);
  const shown = useRef({ v: plan.price });

  useEffect(() => {
    gsap.to(shown.current, {
      v: plan.price, duration: 0.6, ease: "power3.out",
      onUpdate: () => price.current && (price.current.textContent = fmtPrice(Math.round(shown.current.v / 100) * 100)),
    });
  }, [plan.price]);

  const pct = (v: number, lo: number, hi: number) => `${((v - lo) / (hi - lo)) * 100}%`;

  return (
    <div className="grid gap-10 rounded-[2.5rem] border border-white/12 bg-ink-2 p-7 md:p-12 lg:grid-cols-2">
      <div>
        <h3 className="font-display text-3xl font-black md:text-4xl">{d.finder.title}</h3>
        <p className="mt-3 text-white/60">{d.finder.sub}</p>
        <div className="mt-10 space-y-10">
          <label className="block">
            <div className="mb-4 flex justify-between text-sm"><span className="text-white/60">{d.finder.data}</span><span className="font-display text-xl font-bold text-yellow">{gb} {d.gb}</span></div>
            <input type="range" min={0} max={100} value={gb} onChange={(e) => setGb(+e.target.value)} style={{ ["--p" as string]: pct(gb, 0, 100) }} className="w-full" />
          </label>
          <label className="block">
            <div className="mb-4 flex justify-between text-sm"><span className="text-white/60">{d.finder.minutes}</span><span className="font-display text-xl font-bold text-yellow">{fmtPrice(min)}</span></div>
            <input type="range" min={100} max={3000} step={100} value={min} onChange={(e) => setMin(+e.target.value)} style={{ ["--p" as string]: pct(min, 100, 3000) }} className="w-full" />
          </label>
        </div>
      </div>
      <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-yellow p-8 text-ink">
        <svg aria-hidden className="absolute -bottom-16 -right-12 h-72 w-72 opacity-15" viewBox="0 0 24 24"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" fill="currentColor" /></svg>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">{d.finder.best}</p>
          <p key={plan.id} className="font-display mt-3 animate-[pop_.5s_ease-out] text-6xl font-black md:text-7xl">{plan.name}</p>
          <p className="mt-2 text-sm opacity-70">{plan.gb === Infinity ? d.unlimited : `${plan.gb} ${d.gb}`} · {plan.min === Infinity ? d.unlimitedCalls : `${fmtPrice(plan.min)} ${d.min}`}</p>
        </div>
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">{d.finder.total}</p>
            <p className="font-display text-3xl font-black md:text-4xl"><span ref={price}>{fmtPrice(plan.price)}</span> <span className="text-sm font-medium opacity-60">{d.perMonth.split(" ")[0]}</span></p>
          </div>
          <Link href={`/${lang}/tariffs`} className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-yellow transition hover:scale-105">{d.connect}</Link>
        </div>
      </div>
    </div>
  );
}

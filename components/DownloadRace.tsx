"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import type { Dict } from "@/lib/dictionaries";

const SPEEDS = [50, 100, 300, 1000];
const MBITS = 4 * 8192; // 4 GB in Mbit
const SCALE = 30; // time compression for the demo

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60);
  return m ? `${m}:${String(Math.round(s % 60)).padStart(2, "0")}` : `${Math.round(s)} s`;
};

export default function DownloadRace({ d, unit }: { d: Dict["internetPage"]; unit: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const start = () => {
    setRunning(true); setDone(false);
    const ctx = gsap.context(() => {
      gsap.set(".dl-fill", { scaleX: 0 });
      gsap.set(".dl-pct", { textContent: "0%" });
      SPEEDS.forEach((s, i) => {
        const real = MBITS / s;
        const o = { v: 0 };
        gsap.to(`.dl-fill-${i}`, { scaleX: 1, duration: real / SCALE, ease: "none" });
        gsap.to(o, {
          v: 100, duration: real / SCALE, ease: "none",
          onUpdate: () => { const el = root.current?.querySelector(`.dl-pct-${i}`); if (el) el.textContent = Math.round(o.v) + "%"; },
          onComplete: () => { if (i === 0) { setRunning(false); setDone(true); } },
        });
      });
    }, root);
    return ctx;
  };

  return (
    <div ref={root} className="rounded-[2.5rem] border border-white/12 bg-ink-2 p-7 md:p-12">
      <h3 className="font-display text-3xl font-black md:text-4xl">{d.demoTitle}</h3>
      <p className="mt-3 text-white/60">{d.demoSub}</p>
      <div className="mt-10 space-y-5">
        {SPEEDS.map((s, i) => (
          <div key={s} className="grid grid-cols-[5.5rem_1fr_3.2rem] items-center gap-4 md:grid-cols-[9rem_1fr_4rem]">
            <div>
              <div className="font-display text-xl font-black">{s}<span className="ml-1 text-xs font-medium text-white/50">{unit}</span></div>
              <div className="text-xs text-white/45">{fmtTime(MBITS / s)}</div>
            </div>
            <div className="h-4 overflow-hidden rounded-full bg-white/[.08]">
              <div className={`dl-fill dl-fill-${i} h-full origin-left scale-x-0 rounded-full ${i === 3 ? "bg-yellow" : "bg-white/40"}`} />
            </div>
            <div className={`dl-pct dl-pct-${i} text-right text-sm tabular-nums text-white/60`}>0%</div>
          </div>
        ))}
      </div>
      <button disabled={running} onClick={start} className="mt-10 rounded-full bg-yellow px-8 py-4 text-sm font-bold text-ink transition hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
        {done ? d.again : d.start}
      </button>
    </div>
  );
}

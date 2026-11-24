"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Yellow band that skews with scroll velocity.
export default function Ticker({ items }: { items: string[] }) {
  const band = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const skew = gsap.quickTo(band.current, "skewX", { duration: 0.5, ease: "power3" });
    const st = ScrollTrigger.create({
      onUpdate: (s) => skew(gsap.utils.clamp(-14, 14, s.getVelocity() / -250)),
    });
    return () => st.kill();
  }, []);
  const row = [...items, ...items];
  return (
    <div className="relative -mt-px overflow-hidden bg-yellow py-5 text-ink">
      <div ref={band} className="origin-center">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...row, ...row].map((t, i) => (
            <span key={i} className="font-display flex items-center gap-10 text-3xl font-black uppercase md:text-5xl">
              {t}
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" fill="#0b0b0c" /></svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

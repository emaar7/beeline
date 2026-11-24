"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// A thin "bee-line" on the right edge that fills as you scroll.
export default function ScrollProgress() {
  const line = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (s) => {
        if (line.current) line.current.style.transform = `scaleY(${s.progress})`;
        if (dot.current) dot.current.style.top = `${s.progress * 100}%`;
      },
    });
    return () => st.kill();
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed right-3 top-[15vh] z-40 hidden h-[70vh] w-px bg-white/15 md:block">
      <div ref={line} className="h-full w-full origin-top scale-y-0 bg-yellow" />
      <div ref={dot} className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow shadow-[0_0_14px_3px_#ffd21e88]" />
    </div>
  );
}

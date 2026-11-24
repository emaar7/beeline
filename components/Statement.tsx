"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tok = { t: string; hl: boolean };
function parse(text: string): Tok[] {
  let hl = false;
  return text.split(" ").map((raw) => {
    if (raw.startsWith("*")) hl = true;
    const out = { t: raw.replace(/\*/g, ""), hl };
    if (raw.replace(/[.,!?]+$/, "").endsWith("*")) hl = false;
    return out;
  });
}

// Words "ignite" one by one as you scroll through the paragraph.
export default function Statement({ kicker, text }: { kicker: string; text: string }) {
  const root = useRef<HTMLElement>(null);
  const toks = parse(text);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sw",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative bg-ink px-5 py-32 md:px-10 md:py-52">
      <div className="mx-auto max-w-[1300px]">
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.25em] text-yellow">{kicker}</p>
        <p className="font-display text-[clamp(1.9rem,5.2vw,4.6rem)] font-bold leading-[1.12]">
          {toks.map((k, i) => (
            <span key={i} className={`sw ${k.hl ? "text-yellow" : ""}`}>{k.t} </span>
          ))}
        </p>
      </div>
    </section>
  );
}

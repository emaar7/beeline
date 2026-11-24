import Link from "next/link";
import Logo from "./Logo";
import type { Dict, Locale } from "@/lib/dictionaries";

export default function Footer({ lang, d }: { lang: Locale; d: Dict["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <Link href={`/${lang}`}><Logo /></Link>
          <p className="font-display mt-6 max-w-xs text-2xl leading-tight text-white/90">{d.tag}</p>
        </div>
        {d.cols.map((c) => (
          <div key={c.h}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">{c.h}</h3>
            <ul className="mt-5 space-y-3 text-white/70">
              {c.l.map((x) => (
                <li key={x}><a href="#" className="transition hover:text-white">{x}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bee-stripes h-2" />
      <p className="mx-auto max-w-[1500px] px-5 py-6 text-xs text-white/45 md:px-10">{d.rights}</p>
    </footer>
  );
}

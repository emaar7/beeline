import Link from "next/link";
import { fmtPrice, type MobilePlan, type HomePlan } from "@/lib/data";
import type { Dict, Locale } from "@/lib/dictionaries";

export function MobileCard({ p, d, lang, className = "" }: { p: MobilePlan; d: Dict["tariffs"]; lang: Locale; className?: string }) {
  const hot = p.popular;
  return (
    <article
      className={`group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-2 ${
        hot ? "bg-yellow text-ink" : "border border-white/12 bg-ink-2 text-paper"
      } ${className}`}
    >
      <svg aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-[.12] transition duration-700 group-hover:rotate-12 group-hover:scale-110" viewBox="0 0 24 24"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" fill="currentColor" /></svg>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-black">{p.name}</h3>
          {hot && <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow">{d.popular}</span>}
        </div>
        <p className={`mt-2 text-sm ${hot ? "text-ink/70" : "text-white/55"}`}>{(d.tags as Record<string, string>)[p.id]}</p>
        <div className="font-display mt-8 text-[5rem] font-black leading-none">
          {p.gb === 0 ? fmtPrice(p.min) : p.gb === Infinity ? "∞" : p.gb}
          <span className="ml-2 text-2xl">{p.gb === 0 ? d.min : d.gb}</span>
        </div>
        <ul className={`mt-6 space-y-2 text-sm ${hot ? "text-ink/80" : "text-white/70"}`}>
          {p.bonusGb && <li>{d.tasix.replace("{n}", String(p.bonusGb))}</li>}
          <li>{p.min === Infinity ? d.unlimitedCalls : p.gb === 0 ? null : `${fmtPrice(p.min)} ${d.min}`}</li>
          <li>{fmtPrice(p.sms)} {d.sms}</li>
          {p.numbers && <li className="font-semibold">{d.numbersUpTo.replace("{n}", String(p.numbers))}</li>}
        </ul>
      </div>
      <div>
        <div className="font-display text-2xl font-black">{fmtPrice(p.price)} <span className="text-xs font-medium opacity-60">{d.perMonth}</span></div>
        {p.regularPrice && <p className="mt-1 text-xs opacity-60">{d.regular.replace("{price}", fmtPrice(p.regularPrice))}</p>}
        <Link href={`/${lang}/tariffs`} className={`mt-5 block rounded-full py-3.5 text-center text-sm font-bold transition ${hot ? "bg-ink text-yellow hover:bg-black" : "bg-yellow text-ink hover:scale-[1.02]"}`}>
          {d.connect}
        </Link>
      </div>
    </article>
  );
}

export function HomeCard({ p, d, unit, lang }: { p: HomePlan; d: Dict["tariffs"]; unit: string; lang: Locale }) {
  const hot = p.popular;
  return (
    <article className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-7 ${hot ? "bg-yellow text-ink" : "border border-white/12 bg-ink-2"}`}>
      <div>
        {hot && <span className="mb-4 inline-block rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-yellow">{d.popular}</span>}
        <div className="font-display text-6xl font-black leading-none">{p.mbit}</div>
        <div className="mt-1 text-sm font-semibold uppercase tracking-widest opacity-60">{unit}</div>
        <div data-bar className={`mt-8 h-2 origin-left rounded-full ${hot ? "bg-ink" : "bg-yellow"}`} style={{ width: `${Math.max(8, Math.sqrt(p.mbit / 1000) * 100)}%` }} />
      </div>
      <div className="mt-10">
        <div className="font-display text-xl font-black">{fmtPrice(p.price)} <span className="text-xs font-medium opacity-60">{d.perMonth}</span></div>
        <Link href={`/${lang}/internet`} className={`mt-4 block rounded-full py-3 text-center text-sm font-bold ${hot ? "bg-ink text-yellow" : "bg-yellow text-ink"}`}>{d.connect}</Link>
      </div>
    </article>
  );
}

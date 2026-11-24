"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  beelineUrl, familyFor, fmtPrice, hambiUrl, recommend, type MobilePlan,
} from "@/lib/data";
import type { Dict, Locale } from "@/lib/dictionaries";

type Msg = {
  id: number;
  from: "bot" | "user";
  text?: string;
  plan?: MobilePlan;
  cta?: "hambi" | "home";
};
type Step = "type" | "data" | "calls" | "family" | "done";
type Chip = { label: string; run: () => void };

const SEEN = "bl-assistant-seen";
const safe = {
  get: () => { try { return sessionStorage.getItem(SEEN); } catch { return null; } },
  set: () => { try { sessionStorage.setItem(SEEN, "1"); } catch { /* storage blocked */ } },
};

export default function AiAssistant({
  lang, d, t,
}: { lang: Locale; d: Dict["chat"]; t: Dict["tariffs"] }) {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("type");
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const need = useRef({ gb: 0 });
  const id = useRef(0);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  // greeting bubble ~3s after load, once per session
  useEffect(() => {
    if (safe.get()) return;
    const tm = window.setTimeout(() => setTeaser(true), 3000);
    return () => clearTimeout(tm);
  }, []);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, step]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  });

  /** Queue bot messages one after another with a short typing delay. */
  const say = useCallback((parts: Omit<Msg, "id" | "from">[], next?: Step) => {
    let delay = 0;
    parts.forEach((p, i) => {
      delay += 650;
      setTyping(true);
      timers.current.push(window.setTimeout(() => {
        setMsgs((m) => [...m, { ...p, id: ++id.current, from: "bot" }]);
        if (i === parts.length - 1) {
          setTyping(false);
          if (next) setStep(next);
        }
      }, delay));
    });
    if (next) setStep("done"); // hides chips while the bot is "typing"
  }, []);

  const user = (text: string) => setMsgs((m) => [...m, { id: ++id.current, from: "user", text }]);

  const askType = useCallback(() => say([{ text: d.askType }], "type"), [say, d]);
  const showResult = useCallback((main: MobilePlan, alt?: MobilePlan) => {
    say([
      { text: d.result, plan: main },
      ...(alt ? [{ text: d.alt, plan: alt }] : []),
      { text: d.hambi, cta: "hambi" as const },
    ], "done");
  }, [say, d]);
  const goHome = useCallback(() => say([{ text: d.home, cta: "home" }, { text: d.hambi, cta: "hambi" }], "done"), [say, d]);
  const goFamily = useCallback(() => say([{ text: d.askFamily }], "family"), [say, d]);
  const goData = useCallback(() => say([{ text: d.askData }], "data"), [say, d]);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    say([{ text: d.hello }, { text: d.askType }], "type");
  }, [say, d]);

  const reopen = () => {
    setOpen(true); setTeaser(false); safe.set(); start();
    setTimeout(() => field.current?.focus(), 350);
  };
  function close() { setOpen(false); }
  const dismissTeaser = () => { setTeaser(false); safe.set(); };

  const restart = () => { user(d.restart); need.current.gb = 0; askType(); };

  const chips: Chip[] =
    typing ? [] :
    step === "type" ? [
      { label: d.types.personal, run: () => { user(d.types.personal); goData(); } },
      { label: d.types.family, run: () => { user(d.types.family); goFamily(); } },
      { label: d.types.home, run: () => { user(d.types.home); goHome(); } },
    ] :
    step === "data" ? d.data.map((o) => ({ label: o.l, run: () => { user(o.l); need.current.gb = o.gb; say([{ text: d.askCalls }], "calls"); } })) :
    step === "calls" ? d.calls.map((o) => ({ label: o.l, run: () => { user(o.l); const r = recommend(need.current.gb, o.min); showResult(r.main, r.alt); } })) :
    step === "family" ? d.family.map((o) => ({ label: o.l, run: () => { user(o.l); showResult(familyFor(o.n)); } })) :
    msgs.length ? [{ label: d.restart, run: restart }] : [];

  /** Free text: light keyword/number understanding, then fall back to the buttons. */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || typing) return;
    setInput("");
    user(raw);
    const q = raw.toLowerCase();
    const has = (k: string[]) => k.some((w) => q.includes(w));
    const gb = q.match(/(\d+)\s*(gb|гб|гигабайт)/);
    const min = q.match(/(\d+)\s*(daq|min|мин)/);
    if (gb) {
      const r = recommend(+gb[1], min ? +min[1] : 0);
      return showResult(r.main, r.alt);
    }
    if (has(d.kw.hambi)) return say([{ text: d.hambiInfo, cta: "hambi" }], "type");
    if (has(d.kw.home)) return goHome();
    if (has(d.kw.family)) return goFamily();
    if (has(d.kw.personal)) return goData();
    say([{ text: d.fallback }], step === "done" ? "type" : step);
  };

  const planDetails = (p: MobilePlan) =>
    [
      p.gb === 0 ? null : p.gb === Infinity ? t.unlimited : `${p.gb} ${t.gb}`,
      p.min === Infinity ? t.unlimitedCalls : `${fmtPrice(p.min)} ${t.min}`,
      p.numbers ? t.numbersUpTo.replace("{n}", String(p.numbers)) : null,
    ].filter(Boolean).join(" · ");

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {open && (
        <section
          role="dialog" aria-label={d.name}
          className="chat-anim flex h-[min(78svh,640px)] w-[calc(100vw-2rem)] max-w-[400px] animate-[pop_.35s_ease-out] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)]"
        >
          <header className="flex items-center gap-3 bg-yellow px-5 py-4 text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-yellow" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" fill="currentColor" /></svg>
            </span>
            <div className="flex-1 leading-tight">
              <p className="font-display text-base font-black">{d.name}</p>
              <p className="flex items-center gap-1.5 text-xs font-medium opacity-70"><span className="h-1.5 w-1.5 rounded-full bg-green-700" />{d.status}</p>
            </div>
            <button onClick={close} aria-label={d.close} className="grid h-9 w-9 place-items-center rounded-full text-xl transition hover:bg-ink/10">×</button>
          </header>

          <div ref={scroller} data-lenis-prevent aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
            {msgs.map((m) => (
              <div key={m.id} className={`chat-anim flex animate-[pop_.3s_ease-out] ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-md bg-yellow font-medium text-ink" : "rounded-bl-md border border-white/10 bg-ink-2 text-paper"}`}>
                  {m.text && <p>{m.text}</p>}
                  {m.plan && (
                    <div className="mt-3 rounded-xl bg-yellow p-4 text-ink">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-black">{m.plan.name}</span>
                        <span className="font-display text-sm font-black">{fmtPrice(m.plan.price)} <span className="text-[10px] font-medium opacity-60">{t.perMonth}</span></span>
                      </div>
                      <p className="mt-1 text-xs opacity-75">{planDetails(m.plan)}</p>
                      <a href={beelineUrl(lang, m.plan.slug)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-bold underline underline-offset-2">{d.ctaPlan} →</a>
                    </div>
                  )}
                  {m.cta === "hambi" && (
                    <a href={hambiUrl(lang)} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-full bg-yellow px-5 py-3 text-center text-sm font-bold text-ink transition hover:scale-[1.02]">{d.ctaHambi} ↗</a>
                  )}
                  {m.cta === "home" && (
                    <Link href={`/${lang}/internet`} onClick={close} className="mt-3 block rounded-full bg-yellow px-5 py-3 text-center text-sm font-bold text-ink transition hover:scale-[1.02]">{d.ctaHome} →</Link>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start" aria-hidden>
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-ink-2 px-4 py-3.5">
                  {[0, 1, 2].map((i) => <span key={i} className="chat-anim h-1.5 w-1.5 animate-[blink_1s_infinite] rounded-full bg-white/60" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {chips.map((c) => (
                <button key={c.label} onClick={c.run} className="rounded-full border border-yellow/60 px-4 py-2 text-left text-xs font-semibold text-yellow transition hover:bg-yellow hover:text-ink">{c.label}</button>
              ))}
            </div>
          )}

          <form onSubmit={submit} className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-ink-2 py-1.5 pl-4 pr-1.5 focus-within:border-yellow">
              <input ref={field} value={input} onChange={(e) => setInput(e.target.value)} placeholder={d.placeholder} aria-label={d.placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" />
              <button type="submit" aria-label={d.send} disabled={!input.trim() || typing} className="grid h-9 w-9 place-items-center rounded-full bg-yellow text-ink transition disabled:opacity-40">↑</button>
            </div>
            <p className="mt-2 px-2 text-center text-[10px] text-white/35">{d.note}</p>
          </form>
        </section>
      )}

      {!open && teaser && (
        <div className="chat-anim flex max-w-[270px] animate-[pop_.5s_ease-out] items-start gap-2 rounded-2xl rounded-br-md bg-paper p-4 pr-3 text-sm font-medium text-ink shadow-2xl">
          <button onClick={reopen} className="text-left leading-snug">{d.teaser}</button>
          <button onClick={dismissTeaser} aria-label={d.close} className="-mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-base text-ink/50 hover:bg-ink/10">×</button>
        </div>
      )}

      {!open && (
        <button onClick={reopen} aria-label={d.open} className="group relative grid h-16 w-16 place-items-center rounded-full bg-yellow text-ink shadow-[0_10px_40px_-8px_#ffd21e99] transition hover:scale-105">
          <span className="chat-anim absolute inset-0 animate-ping rounded-full bg-yellow/40 [animation-duration:2.4s]" aria-hidden />
          <svg className="relative" width="28" height="28" viewBox="0 0 24 24" aria-hidden><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z" fill="currentColor" /></svg>
        </button>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import BeeMascot from "./BeeMascot";
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
  fresh?: boolean; // stream the text in
};
type Step = "type" | "data" | "calls" | "family" | "done";
type Chip = { label: string; run: () => void };

const SEEN = "bl-assistant-seen";
const safe = {
  get: () => { try { return sessionStorage.getItem(SEEN); } catch { return null; } },
  set: () => { try { sessionStorage.setItem(SEEN, "1"); } catch { /* storage blocked */ } },
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Streams text in like a model generating tokens, then reveals what follows. */
function Streamed({ text, fresh, onTick, children }: { text?: string; fresh?: boolean; onTick: () => void; children?: React.ReactNode }) {
  const [n, setN] = useState(fresh ? 0 : (text?.length ?? 0));
  useEffect(() => {
    if (!fresh || !text) return;
    const iv = setInterval(() => {
      setN((v) => {
        if (v + 2 >= text.length) clearInterval(iv);
        return Math.min(text.length, v + 2);
      });
      onTick();
    }, 18);
    return () => clearInterval(iv);
  }, [fresh, text, onTick]);
  const done = !text || n >= text.length;
  return (
    <>
      {text && <p>{text.slice(0, n)}{!done && <span className="ml-0.5 inline-block h-3.5 w-[3px] translate-y-0.5 animate-pulse bg-yellow" />}</p>}
      {done && children}
    </>
  );
}

export default function AiAssistant({
  lang, d, t,
}: { lang: Locale; d: Dict["chat"]; t: Dict["tariffs"] }) {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [side, setSide] = useState<"left" | "right">("left");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("type");
  const [thinking, setThinking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [gbNeed, setGbNeed] = useState(0);
  const id = useRef(0);
  const run = useRef(0);
  const started = useRef(false);
  const hinted = useRef(new Set<string>());
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const bee = useRef<HTMLDivElement>(null);
  const flip = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const reduce = useRef(false);

  const scrollDown = useCallback(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => { run.current = -1; };
  }, []);
  useEffect(() => { openRef.current = open; }, [open]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  useEffect(() => { scrollDown(); }, [msgs, thinking, step, scrollDown]);

  // ---- the bee: flies in, drifts across the page with scroll, perches when idle ----
  useEffect(() => {
    const el = bee.current!, face = flip.current!;
    const small = () => window.innerWidth < 640;
    const size = () => (small() ? 58 : 78);
    const pos = { x: window.innerWidth + 120, y: window.innerHeight * 0.15 };
    const t0 = performance.now();
    let lastScroll = -1e9, facing = 1, rot = 0, raf = 0, last = t0, prev = 0;
    let sideNow: "left" | "right" = "left";

    const target = (now: number) => {
      const vw = window.innerWidth, vh = window.innerHeight, sz = size();
      const time = (now - t0) / 1000;
      const bobX = Math.sin(time * 1.7) * 4, bobY = Math.sin(time * 2.4) * 7;
      const perch = { x: vw - sz - (small() ? 14 : 28), y: vh - sz - (small() ? 18 : 30) };
      const roaming = now - lastScroll < 2200 && !openRef.current;
      if (!roaming || reduce.current) return { x: perch.x + bobX, y: perch.y + bobY, roaming: false };
      const doc = Math.max(1, document.documentElement.scrollHeight - vh);
      const p = window.scrollY / doc;
      return {
        x: vw * (0.5 + 0.38 * Math.sin(p * Math.PI * 9)) - sz / 2 + bobX,
        y: vh * (0.52 + 0.2 * Math.cos(p * Math.PI * 6)) + bobY,
        roaming: true,
      };
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const tg = target(now);
      const k = 1 - Math.exp(-dt * (tg.roaming ? 2.6 : 1.8));
      const dx = tg.x - pos.x;
      pos.x += dx * k; pos.y += (tg.y - pos.y) * k;
      if (Math.abs(dx) > 14) facing = dx > 0 ? -1 : 1; // art faces left
      rot += (clamp(dx * 0.05, -16, 16) - rot) * 0.1;
      el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0)`;
      face.style.transform = `scaleX(${facing}) rotate(${rot * facing}deg)`;
      const s: "left" | "right" = pos.x > window.innerWidth / 2 ? "left" : "right";
      if (s !== sideNow && Math.abs(pos.x - prev) < 40) { sideNow = s; setSide(s); }
      prev = pos.x;
    };

    const onScroll = () => { lastScroll = performance.now(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (reduce.current) {
      const perch = () => {
        const sz = size();
        el.style.transform = `translate3d(${window.innerWidth - sz - 18}px,${window.innerHeight - sz - 24}px,0)`;
      };
      perch(); window.addEventListener("resize", perch);
      return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", perch); };
    }
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  // greeting bubble ~3s after load (once per session) + contextual hints near key sections
  useEffect(() => {
    let hide = 0;
    const show = (text: string) => {
      if (openRef.current) return;
      setBubble(text);
      clearTimeout(hide);
      hide = window.setTimeout(() => setBubble(null), 7500);
    };
    let tm = 0;
    if (!safe.get()) tm = window.setTimeout(() => show(d.teaser), 3000);
    const targets: [string, string][] = [["tariffs", d.hints.tariffs], ["coverage", d.hints.speed], ["world", d.hints.world]];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const key = e.target.id;
        if (hinted.current.has(key)) continue;
        hinted.current.add(key);
        show(targets.find(([k]) => k === key)![1]);
      }
    }, { threshold: 0.45 });
    targets.forEach(([k]) => { const n = document.getElementById(k); if (n) io.observe(n); });
    return () => { clearTimeout(tm); clearTimeout(hide); io.disconnect(); };
  }, [d]);

  /** Bot speaks: "thinks", then streams each message in, one after another. */
  const say = useCallback(async (parts: Omit<Msg, "id" | "from">[], next?: Step) => {
    const me = ++run.current;
    setBusy(true);
    const fast = reduce.current;
    for (const p of parts) {
      setThinking(true);
      await sleep(fast ? 120 : 650);
      if (run.current !== me) return;
      setThinking(false);
      setMsgs((m) => [...m, { ...p, id: ++id.current, from: "bot", fresh: !fast }]);
      await sleep(fast ? 80 : Math.min(2400, (p.text?.length ?? 0) * 9) + 350);
      if (run.current !== me) return;
    }
    setBusy(false);
    if (next) setStep(next);
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
    setOpen(true); setBubble(null); safe.set(); start();
    setTimeout(() => field.current?.focus(), 350);
  };
  function close() { setOpen(false); }
  const dismissBubble = () => { setBubble(null); safe.set(); };

  const restart = () => { user(d.restart); setGbNeed(0); askType(); };

  const chips: Chip[] =
    busy ? [] :
    step === "type" ? [
      { label: d.types.personal, run: () => { user(d.types.personal); goData(); } },
      { label: d.types.family, run: () => { user(d.types.family); goFamily(); } },
      { label: d.types.home, run: () => { user(d.types.home); goHome(); } },
    ] :
    step === "data" ? d.data.map((o) => ({ label: o.l, run: () => { user(o.l); setGbNeed(o.gb); say([{ text: d.askCalls }], "calls"); } })) :
    step === "calls" ? d.calls.map((o) => ({ label: o.l, run: () => { user(o.l); const r = recommend(gbNeed, o.min); showResult(r.main, r.alt); } })) :
    step === "family" ? d.family.map((o) => ({ label: o.l, run: () => { user(o.l); showResult(familyFor(o.n)); } })) :
    msgs.length ? [{ label: d.restart, run: restart }] : [];

  /** Free text: light keyword/number understanding, then fall back to the buttons. */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || busy) return;
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
    <>
      {open && (
        <section
          role="dialog" aria-label={d.name}
          className="chat-anim fixed bottom-4 right-4 z-[60] flex h-[min(78svh,640px)] w-[calc(100vw-2rem)] max-w-[400px] origin-bottom-right animate-[pop_.35s_ease-out] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] md:bottom-6 md:right-6"
        >
          <header className="relative flex items-center gap-3 overflow-hidden bg-yellow px-5 py-3 text-ink">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink" aria-hidden>
              <BeeMascot size={40} mode={thinking || busy ? "thinking" : "idle"} />
            </span>
            <div className="flex-1 leading-tight">
              <p className="font-display text-base font-black">{d.name}</p>
              <p className="flex items-center gap-1.5 text-xs font-medium opacity-70">
                <span className={`h-1.5 w-1.5 rounded-full ${busy ? "animate-pulse bg-ink" : "bg-green-700"}`} />
                {busy ? "···" : d.status}
              </p>
            </div>
            <button onClick={close} aria-label={d.close} className="grid h-9 w-9 place-items-center rounded-full text-xl transition hover:bg-ink/10">×</button>
          </header>

          <div ref={scroller} data-lenis-prevent aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
            {msgs.map((m) => (
              <div key={m.id} className={`chat-anim flex animate-[pop_.3s_ease-out] ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "user" ? "rounded-br-md bg-yellow font-medium text-ink" : "rounded-bl-md border border-white/10 bg-ink-2 text-paper"}`}>
                  {m.from === "user" ? <p>{m.text}</p> : (
                    <Streamed text={m.text} fresh={m.fresh} onTick={scrollDown}>
                      {m.plan && (
                        <div className="chat-anim mt-3 animate-[pop_.4s_ease-out] rounded-xl bg-yellow p-4 text-ink">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-display text-lg font-black">{m.plan.name}</span>
                            <span className="font-display text-sm font-black">{fmtPrice(m.plan.price)} <span className="text-[10px] font-medium opacity-60">{t.perMonth}</span></span>
                          </div>
                          <p className="mt-1 text-xs opacity-75">{planDetails(m.plan)}</p>
                          <a href={beelineUrl(lang, m.plan.slug)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs font-bold underline underline-offset-2">{d.ctaPlan} →</a>
                        </div>
                      )}
                      {m.cta === "hambi" && (
                        <a href={hambiUrl(lang)} target="_blank" rel="noopener noreferrer" className="chat-anim mt-3 block animate-[pop_.4s_ease-out] rounded-full bg-yellow px-5 py-3 text-center text-sm font-bold text-ink transition hover:scale-[1.02]">{d.ctaHambi} ↗</a>
                      )}
                      {m.cta === "home" && (
                        <Link href={`/${lang}/internet`} onClick={close} className="chat-anim mt-3 block animate-[pop_.4s_ease-out] rounded-full bg-yellow px-5 py-3 text-center text-sm font-bold text-ink transition hover:scale-[1.02]">{d.ctaHome} →</Link>
                      )}
                    </Streamed>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start" aria-hidden>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-ink-2 px-4 py-3.5">
                  {[0, 1, 2].map((i) => <span key={i} className="chat-anim h-1.5 w-1.5 animate-[blink_1s_infinite] rounded-full bg-yellow" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
          </div>

          {/* chip handlers only touch refs when clicked, not during render */}
          {/* eslint-disable react-hooks/refs */}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {chips.map((c) => (
                <button key={c.label} onClick={c.run} className="rounded-full border border-yellow/60 px-4 py-2 text-left text-xs font-semibold text-yellow transition hover:bg-yellow hover:text-ink">{c.label}</button>
              ))}
            </div>
          )}
          {/* eslint-enable react-hooks/refs */}

          <form onSubmit={submit} className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-ink-2 py-1.5 pl-4 pr-1.5 focus-within:border-yellow">
              <input ref={field} value={input} onChange={(e) => setInput(e.target.value)} placeholder={d.placeholder} aria-label={d.placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" />
              <button type="submit" aria-label={d.send} disabled={!input.trim() || busy} className="grid h-9 w-9 place-items-center rounded-full bg-yellow text-ink transition disabled:opacity-40">↑</button>
            </div>
            <p className="mt-2 px-2 text-center text-[10px] text-white/35">{d.note}</p>
          </form>
        </section>
      )}

      {/* the floating bee — position is driven by the rAF loop above */}
      <div
        ref={bee}
        className={`fixed left-0 top-0 z-[60] transition-opacity duration-300 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        style={{ transform: "translate3d(110vw,15vh,0)", willChange: "transform" }}
      >
        {bubble && (
          <div className={`chat-anim absolute top-1/2 w-max max-w-[230px] -translate-y-1/2 animate-[pop_.45s_ease-out] sm:max-w-[270px] ${side === "left" ? "right-full mr-2" : "left-full ml-2"}`}>
            <div className="relative flex items-start gap-2 rounded-2xl bg-paper p-3.5 pr-2.5 text-sm font-medium leading-snug text-ink shadow-2xl">
              <button onClick={reopen} className="text-left">{bubble}</button>
              <button onClick={dismissBubble} aria-label={d.close} className="-mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-base text-ink/50 hover:bg-ink/10">×</button>
            </div>
          </div>
        )}
        <button onClick={reopen} aria-label={d.open} tabIndex={open ? -1 : 0} className="block cursor-pointer rounded-full outline-offset-4 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-yellow">
          <div ref={flip} className="origin-center">
            <span className="hidden sm:block"><BeeMascot size={78} mode={busy ? "thinking" : "idle"} /></span>
            <span className="block sm:hidden"><BeeMascot size={58} mode={busy ? "thinking" : "idle"} /></span>
          </div>
        </button>
      </div>
    </>
  );
}

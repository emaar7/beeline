"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 0..1.6 – extra speed pushed in from scroll. Read every frame. */
  speedRef?: { current: number };
  baseSpeed?: number;
  className?: string;
};

const RINGS = 28;
const STREAKS = 150;

/**
 * Pseudo-3D hexagonal "speed tunnel" on a 2D canvas.
 * Hexagons nod to the honeycomb; speed is driven by scroll + cursor bends it.
 */
export default function Tunnel({ speedRef, baseSpeed = 0.22, className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, R = 0, raf = 0, visible = true;
    let v = baseSpeed;
    let time = 0;
    const ptr = { x: 0, y: 0, sx: 0, sy: 0 };

    const offsets = Array.from({ length: RINGS }, (_, i) => i / RINGS);
    const streaks = Array.from({ length: STREAKS }, () => ({
      a: Math.random() * Math.PI * 2,
      u: Math.random(),
      s: 0.6 + Math.random() * 1.2,
      hue: Math.random() < 0.22,
    }));
    let base = 0; // shared progress for rings

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.hypot(w, h) * 0.62;
      if (reduce) draw();
    };

    const A = 0.045;
    // perspective radius for depth progress u in [0,1)
    const rad = (u: number) => (R * A) / (1 - u + A);

    function draw() {
      const boost = speedRef?.current ?? 0;
      ctx.fillStyle = "#0b0b0c";
      ctx.fillRect(0, 0, w, h);

      const cx0 = w / 2, cy0 = h / 2;
      const bx = ptr.sx * w * 0.14, by = ptr.sy * h * 0.14;
      const sway = Math.sin(time * 0.45) * w * 0.02;

      // core glow
      const gr = Math.min(w, h) * (0.35 + boost * 0.35);
      const g = ctx.createRadialGradient(cx0 + bx * 0.1, cy0 + by * 0.1, 0, cx0, cy0, gr);
      g.addColorStop(0, `rgba(255,210,30,${0.22 + boost * 0.55})`);
      g.addColorStop(1, "rgba(255,210,30,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // rings, far -> near
      const items = offsets
        .map((o) => ({ u: (o + base) % 1, o }))
        .sort((a, b) => a.u - b.u);
      const twist = 0.9 + boost * 0.5;
      const corners: { x: number; y: number }[][] = [];

      for (const { u, o } of items) {
        const r = rad(u);
        const cx = cx0 + (bx + sway) * u * u;
        const cy = cy0 + by * u * u;
        const rot = time * 0.06 + u * twist;
        const gate = Math.round(o * RINGS) % 7 === 0;
        const fade = Math.min(1, u * 7) * (1 - Math.pow(u, 8) * 0.9);

        ctx.beginPath();
        const pts: { x: number; y: number }[] = [];
        for (let k = 0; k < 6; k++) {
          const a = rot + (k * Math.PI) / 3;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          pts.push({ x, y });
          k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
        corners.push(pts);

        if (gate) {
          ctx.lineWidth = 2 + (r / R) * 14;
          ctx.strokeStyle = `rgba(255,210,30,${0.95 * fade})`;
          ctx.shadowColor = "rgba(255,210,30,.8)";
          ctx.shadowBlur = 18;
        } else {
          ctx.lineWidth = 0.8 + (r / R) * 5;
          ctx.strokeStyle = `rgba(255,255,255,${0.2 * fade})`;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // spiral walls connecting ring corners
      ctx.lineWidth = 1;
      for (let k = 0; k < 6; k++) {
        ctx.beginPath();
        corners.forEach((c, i) => (i ? ctx.lineTo(c[k].x, c[k].y) : ctx.moveTo(c[k].x, c[k].y)));
        ctx.strokeStyle = "rgba(255,210,30,0.22)";
        ctx.stroke();
      }

      // streaks
      ctx.lineCap = "round";
      for (const s of streaks) {
        const tail = Math.max(0, s.u - (0.012 + v * 0.06) * s.s);
        const r1 = rad(s.u), r0 = rad(tail);
        const cx = cx0 + (bx + sway) * s.u * s.u;
        const cy = cy0 + by * s.u * s.u;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(s.a) * r0, cy + Math.sin(s.a) * r0);
        ctx.lineTo(cx + Math.cos(s.a) * r1, cy + Math.sin(s.a) * r1);
        ctx.lineWidth = 0.6 + (r1 / R) * 3.2;
        const al = Math.min(1, s.u * 4) * 0.85;
        ctx.strokeStyle = s.hue ? `rgba(255,210,30,${al})` : `rgba(255,255,255,${al * 0.6})`;
        ctx.stroke();
      }

      // vignette
      const vg = ctx.createRadialGradient(cx0, cy0, Math.min(w, h) * 0.25, cx0, cy0, R * 0.95);
      vg.addColorStop(0, "rgba(11,11,12,0)");
      vg.addColorStop(1, "rgba(11,11,12,.85)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);
    }

    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      const target = baseSpeed + (speedRef?.current ?? 0) * 1.5;
      v += (target - v) * Math.min(1, dt * 4);
      base = (base + v * dt * 0.32) % 1;
      for (const s of streaks) {
        s.u += v * dt * 0.9 * s.s;
        if (s.u >= 1) { s.u = 0; s.a = Math.random() * Math.PI * 2; }
      }
      ptr.sx += (ptr.x - ptr.sx) * Math.min(1, dt * 3);
      ptr.sy += (ptr.y - ptr.sy) * Math.min(1, dt * 3);
      draw();
    };

    const onMove = (e: PointerEvent) => {
      ptr.x = (e.clientX / window.innerWidth - 0.5) * 2;
      ptr.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [speedRef, baseSpeed]);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden />;
}

import { useId } from "react";

/** Brand-yellow bee. Faces left. `thinking` = frantic wings + wiggling antennae. */
export default function BeeMascot({
  size = 72,
  mode = "idle",
  className = "",
}: { size?: number; mode?: "idle" | "thinking"; className?: string }) {
  const id = useId();
  return (
    <svg
      data-mode={mode}
      width={size}
      height={(size * 80) / 100}
      viewBox="0 0 100 80"
      aria-hidden
      className={className}
      style={{ filter: "drop-shadow(0 6px 14px rgba(255,210,30,.45))", overflow: "visible" }}
    >
      <defs>
        <clipPath id={`${id}b`}><ellipse cx="54" cy="48" rx="27" ry="19" /></clipPath>
      </defs>
      {/* wings */}
      <ellipse className="bee-wing" style={{ ["--r" as string]: "-28deg" }} cx="47" cy="22" rx="7.5" ry="15" fill="#fff" fillOpacity=".78" stroke="#ffffff" strokeOpacity=".9" />
      <ellipse className="bee-wing b" style={{ ["--r" as string]: "24deg" }} cx="60" cy="23" rx="7.5" ry="14" fill="#fff" fillOpacity=".6" stroke="#ffffff" strokeOpacity=".8" />
      {/* body */}
      <ellipse cx="54" cy="48" rx="27" ry="19" fill="#ffd21e" />
      <g clipPath={`url(#${id}b)`} fill="#0b0b0c">
        <rect x="46" y="26" width="8" height="46" transform="rotate(12 50 48)" />
        <rect x="61" y="26" width="8" height="46" transform="rotate(12 65 48)" />
        <rect x="76" y="26" width="8" height="46" transform="rotate(12 80 48)" />
      </g>
      <path d="M80 48 l9 -2.5 v5z" fill="#0b0b0c" />
      {/* head */}
      <circle cx="26" cy="49" r="15" fill="#0b0b0c" />
      <circle cx="21" cy="46" r="4.6" fill="#fff" />
      <circle cx="19.8" cy="46" r="2.1" fill="#0b0b0c" />
      <path d="M17 56 q5 4.5 11 0" fill="none" stroke="#ffd21e" strokeWidth="1.8" strokeLinecap="round" />
      {/* antennae */}
      <g className="bee-ant" stroke="#0b0b0c" strokeWidth="2" strokeLinecap="round">
        <path d="M20 36 q-4 -9 -11 -13" fill="none" />
        <circle cx="8" cy="22" r="2.8" fill="#ffd21e" stroke="none" />
      </g>
      <g className="bee-ant" style={{ animationDelay: "-.5s" }} stroke="#0b0b0c" strokeWidth="2" strokeLinecap="round">
        <path d="M30 35 q2 -10 9 -15" fill="none" />
        <circle cx="40" cy="19" r="2.8" fill="#ffd21e" stroke="none" />
      </g>
      {/* AI sparkle */}
      <path className="bee-spark" d="M86 12 l2.2 5.8 5.8 2.2 -5.8 2.2 -2.2 5.8 -2.2 -5.8 -5.8 -2.2 5.8 -2.2z" fill="#fff" />
    </svg>
  );
}

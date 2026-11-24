import { createElement } from "react";

/** Wraps each word in a masked span so GSAP can slide it up (`.w` targets). */
export default function SplitWords({
  text,
  as = "span",
  className = "",
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return createElement(
    as,
    { className, "aria-label": text },
    text.split(" ").map((w, i, a) => (
      <span key={i} aria-hidden className="word-mask">
        <span className="w">{w}{i < a.length - 1 ? " " : ""}</span>
      </span>
    )),
  );
}

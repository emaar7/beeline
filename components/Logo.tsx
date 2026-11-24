// Placeholder mark — swap for the official Beeline logo asset.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <clipPath id="lg"><circle cx="16" cy="16" r="16" /></clipPath>
        </defs>
        <g clipPath="url(#lg)">
          <rect width="32" height="32" fill="#ffd21e" />
          <path d="M-4 12 L20 -12 L26 -6 L2 18Z M2 26 L26 2 L32 8 L8 32Z" fill="#0b0b0c" />
        </g>
      </svg>
      <span className="font-display text-xl font-bold lowercase tracking-tight">
        beeline
      </span>
    </span>
  );
}

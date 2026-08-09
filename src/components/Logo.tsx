type LogoProps = {
  className?: string;
  /** Color of the mark; text inherits currentColor. */
  markColor?: string;
};

/** Komşum wordmark: a little house/pin mark + the name. */
export default function Logo({ className = "", markColor }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 3 4 12.5V28a1 1 0 0 0 1 1h7v-8a4 4 0 0 1 8 0v8h7a1 1 0 0 0 1-1V12.5L16 3Z"
          fill={markColor ?? "var(--color-accent)"}
        />
        <circle cx="16" cy="11.5" r="2.4" fill="#fff" />
      </svg>
      <span className="font-display text-[1.35rem] leading-none">Komşum</span>
    </span>
  );
}

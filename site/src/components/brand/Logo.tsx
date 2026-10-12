import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

/**
 * Provisional mark. One SVG coloured by currentColor, so it is violet on light
 * and white on dark without a second asset. Swap this file when the name is final.
 */
export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path d="M17 5h14" />
      <path d="M19.5 5v12L9.2 36.1a4.5 4.5 0 0 0 4 6.7h21.6a4.5 4.5 0 0 0 4-6.7L28.5 17V5" />
      <path d="M17.5 31l5 5 8.5-9" />
    </svg>
  );
}

/**
 * Full lockup. On light the mark is violet; on a dark scene pass tone="dark" for a white mark.
 */
export function Logo({
  className,
  size = 22,
  tone = "light",
}: {
  className?: string;
  size?: number;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark size={size} className={tone === "dark" ? "text-paper" : "text-violet"} />
      <span
        className="font-extrabold tracking-[-0.04em] leading-none"
        style={{ fontSize: Math.round(size * 0.95) }}
      >
        {BRAND.name}
      </span>
    </span>
  );
}

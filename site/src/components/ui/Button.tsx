import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "ink";
export type ButtonSize = "sm" | "md" | "lg";

type Props = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow in a white circle, as in the reference. */
  arrow?: boolean;
  href?: string;
  loading?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const SIZE: Record<ButtonSize, string> = {
  sm: "h-9 pl-4 text-[14px] gap-3",
  md: "h-11 pl-5 text-[15px] gap-3",
  lg: "h-[52px] pl-6 text-base gap-4",
};
const PAD_END: Record<ButtonSize, [string, string]> = {
  sm: ["pr-1", "pr-4"],
  md: ["pr-1.5", "pr-5"],
  lg: ["pr-1.5", "pr-6"],
};
const CIRCLE: Record<ButtonSize, string> = { sm: "h-7 w-7", md: "h-8 w-8", lg: "h-10 w-10" };

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-bg-hover)]",
  ink: "bg-ink text-paper hover:bg-ink-2",
  secondary: "bg-transparent text-ink shadow-[inset_0_0_0_1px_var(--line-strong)] hover:bg-sand",
  ghost: "bg-transparent text-ink hover:bg-sand",
};
const CIRCLE_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-paper text-ink",
  ink: "bg-paper text-ink",
  secondary: "bg-ink text-paper",
  ghost: "bg-ink text-paper",
};

/** Primary button. Version A: ink pill with an arrow circle that turns on hover. Version B: violet, 10px corners, no arrow. */
export function Button({ variant = "primary", size = "md", arrow = false, href, loading = false, className, children, disabled, ...rest }: Props) {
  const pad = { sm: "16px", md: "20px", lg: "24px" }[size];
  const classes = cn(
    "group/btn relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-btn font-medium",
    "transition-[background-color,color,box-shadow,transform] duration-[240ms] ease-out active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    SIZE[size],
    arrow ? cn(PAD_END[size][0], "btn-has-arrow") : PAD_END[size][1],
    VARIANT[variant],
    className,
  );
  const content = (
    <>
      <span className={cn("inline-flex items-center", loading && "opacity-0")}>{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className={cn(
            "btn-arrow inline-flex shrink-0 items-center justify-center rounded-pill transition-transform duration-[480ms] ease-[var(--ease-out-expo)] group-hover/btn:rotate-45",
            CIRCLE[size],
            CIRCLE_VARIANT[variant],
            loading && "opacity-0",
          )}
        >
          <ArrowUpRight size={size === "lg" ? 16 : 14} weight="bold" />
        </span>
      )}
      {loading && (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-pill border-2 border-current border-r-transparent opacity-70" />
        </span>
      )}
    </>
  );
  const style = { "--btn-pad": pad } as CSSProperties;
  if (href?.startsWith("#")) return <a href={href} className={classes} style={style}>{content}</a>;
  if (href) return <Link href={href} className={classes} style={style}>{content}</Link>;
  return (
    <button type="button" className={classes} style={style} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  );
}

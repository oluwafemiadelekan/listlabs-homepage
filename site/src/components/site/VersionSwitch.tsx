"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { variantFromPath, type Variant } from "@/lib/site";

/**
 * Review chrome only: flips between the two versions of whatever page you are on.
 * Plain links (full page load) so it works even in a tab left open across a dev-server restart.
 */
export function VersionSwitch() {
  const path = usePathname() || "/";
  const current = variantFromPath(path);
  const bare = current === "b" ? path.replace(/^\/b(?=\/|$)/, "") || "/" : path;
  const hrefFor = (v: Variant) => (v === "b" ? (bare === "/" ? "/b" : `/b${bare}`) : bare);
  const item = (v: Variant, label: string) => (
    <a
      href={hrefFor(v)}
      aria-current={current === v ? "page" : undefined}
      className={cn(
        "rounded-chip px-2.5 py-1 text-[11px] font-medium transition-colors duration-[240ms] ease-out sm:px-3 sm:py-1.5 sm:text-[12px]",
        current === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
      )}
    >
      {label}
    </a>
  );
  return (
    <nav aria-label="Design versions" className="fixed bottom-3 right-3 z-[80] flex items-center gap-0.5 rounded-field bg-paper p-1 shadow-float sm:bottom-4 sm:right-4">
      {item("a", "Version A")}
      {item("b", "Version B")}
    </nav>
  );
}

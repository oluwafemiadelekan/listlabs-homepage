import { ClaimProvider } from "@/components/claim/ClaimFlow";
import { Close, TryIt } from "@/components/home/Closing";
import { Features } from "@/components/home/Features";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Listings } from "@/components/home/Listings";
import { Statement } from "@/components/home/Statement";
import { Uses } from "@/components/home/Uses";
import { cn } from "@/lib/cn";

export type Variant = "a" | "b";

/** Review chrome only: flips between the two versions. Not part of the design. */
function VersionSwitch({ variant }: { variant: Variant }) {
  // A plain link, not next/link: a full page load always lands on the other version,
  // even in a tab left open across a dev-server restart, and resets scroll and overlays.
  const item = (v: Variant, href: string, label: string) => (
    <a
      href={href}
      aria-current={variant === v ? "page" : undefined}
      className={cn(
        "rounded-chip px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:py-1.5 sm:text-[12px] transition-colors duration-[240ms] ease-out",
        variant === v ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
      )}
    >
      {label}
    </a>
  );
  return (
    <nav aria-label="Design versions" className="fixed bottom-3 right-3 z-[80] flex items-center gap-0.5 rounded-field bg-paper p-1 shadow-float sm:bottom-4 sm:right-4">
      {item("a", "/", "Version A")}
      {item("b", "/b", "Version B")}
    </nav>
  );
}

/**
 * The homepage. Version A: rounded, plum palette, arrow buttons. Version B: the client's original
 * colours, tighter corners, no arrows. Same layout and content; the difference is all in tokens
 * (globals.css, :root:has([data-variant="b"])).
 */
export function HomePage({ variant }: { variant: Variant }) {
  return (
    <div data-variant={variant}>
      <ClaimProvider>
        <Header />
        <main>
          {/* Header is 80px tall; header plus hero fill exactly one screen. */}
          <div className="flex min-h-[calc(100svh-80px)] flex-col">
            <Hero />
          </div>
          <Statement />
          <Listings />
          <Uses />
          <Features />
          <HowItWorks />
          <TryIt />
          <Close />
        </main>
      </ClaimProvider>
      <VersionSwitch variant={variant} />
    </div>
  );
}

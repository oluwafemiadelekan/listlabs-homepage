import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Listings } from "@/components/home/Listings";
import { Statement } from "@/components/home/Statement";
import { TryIt } from "@/components/home/Closing";
import { Uses } from "@/components/home/Uses";
import { SiteShell } from "@/components/site/SiteShell";
import { basePath, type Variant } from "@/lib/site";

export type { Variant };

/**
 * The homepage. Version A: rounded, plum palette, arrow buttons. Version B: the client's original
 * colours, tighter corners, no arrows. Same layout and content; the difference is all in tokens.
 */
export function HomePage({ variant }: { variant: Variant }) {
  return (
    <SiteShell variant={variant}>
      {/* Header is 80px tall; header plus hero fill exactly one screen. */}
      <div className="flex min-h-[calc(100svh-80px)] flex-col">
        <Hero />
      </div>
      <Statement />
      <Listings />
      <Uses base={basePath(variant)} />
      <Features />
      <HowItWorks />
      <TryIt />
    </SiteShell>
  );
}

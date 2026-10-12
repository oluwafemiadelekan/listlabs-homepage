import { ClaimProvider } from "@/components/claim/ClaimFlow";
import { Close, TryIt } from "@/components/home/Closing";
import { Features } from "@/components/home/Features";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Listings } from "@/components/home/Listings";
import { Statement } from "@/components/home/Statement";
import { Uses } from "@/components/home/Uses";

/**
 * Laid out on the photographer reference. The header and hero fill exactly one screen; every
 * section after that is separated by the same gap (.section-gap). Every claim button and form
 * opens the full-screen claim flow (ClaimProvider).
 */
export default function Home() {
  return (
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
  );
}

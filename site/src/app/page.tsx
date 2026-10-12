import { Close, TryIt } from "@/components/home/Closing";
import { Features } from "@/components/home/Features";
import { Header } from "@/components/home/Header";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Uses } from "@/components/home/Uses";

/**
 * Laid out on the photographer reference: header, headline row, cell strip, centred statement,
 * bento (uses), gallery (features), numbered steps (how it works), then try it and the close.
 * This is the client's "Uses first" order, with features moved up to match the reference.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Uses />
        <Features />
        <HowItWorks />
        <TryIt />
        <Close />
      </main>
    </>
  );
}

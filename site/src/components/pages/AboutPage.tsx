import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { AUDIENCES, AUDIENCE_KEYS } from "@/lib/site";

/*
  Every line on this page is the client's own, from the brand guide's foundation section
  (mission, perspective, the three pains, who it's for). Only the section headings are ours.
*/
const PAINS = [
  { title: "Reach", body: "The right buyer is out there and you can't find them fast enough." },
  { title: "The text bomb", body: "Every new deal means saying the same thing 50 times." },
  { title: "No private middle ground", body: "Go fully public and lose your edge, or stay private and reach no one. Nothing between." },
];

const OTHERS = ["Real estate pros and investors", "Anyone who moves value through private relationships"];

export function AboutPage({ base }: { base: string }) {
  return (
    <>
      {/* Mission */}
      <section className="pt-[clamp(24px,5vh,56px)]">
        <div className="container">
          <Reveal>
            <p className="text-[14px] text-muted">About</p>
            <h1 className="t-h1 mt-3 max-w-[16ch]">Open access to opportunity.</h1>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-[4px] lg:grid-cols-[1.4fr_1fr]">
            <RevealItem className="relative min-h-[320px] overflow-hidden rounded-card bg-plum sm:min-h-[420px]">
              <Image src="/images/handshake.jpg" alt="Two business partners shaking hands across a table" fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" style={{ objectPosition: "50% 40%" }} />
            </RevealItem>
            <RevealItem className="flex flex-col justify-between gap-10 rounded-card bg-sand p-7 sm:p-9">
              <p className="text-[14px] text-muted">What we believe</p>
              <p className="t-statement">The best deals move through relationships, not public marketplaces.</p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* What we are, and against */}
      <section className="section-gap">
        <div className="container">
          <RevealGroup className="grid gap-[4px] md:grid-cols-2">
            <RevealItem className="flex min-h-[260px] flex-col justify-between rounded-card bg-plum p-7 text-paper sm:p-9">
              <p className="text-[14px] text-paper/60">What we are</p>
              <p className="text-[clamp(1.4rem,1rem+1.2vw,2rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                A working tool for people who move things. Built for closing, not posting.
              </p>
            </RevealItem>
            <RevealItem className="flex min-h-[260px] flex-col justify-between rounded-card bg-paper p-7 sm:p-9">
              <p className="text-[14px] text-muted">What we are against</p>
              <p className="text-[clamp(1.4rem,1rem+1.2vw,2rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                Marketplaces that take a cut and control visibility. Feeds built to keep you scrolling.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* The three pains */}
      <section className="section-gap">
        <div className="container">
          <Reveal>
            <h2 className="t-h2 max-w-[20ch]">The three pains we exist to kill</h2>
          </Reveal>
          <ol className="m-0 mt-10 list-none border-b border-line p-0">
            {PAINS.map((p, i) => (
              <li key={p.title} className="grid gap-x-6 gap-y-2 border-t border-line py-7 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)]">
                <span className="t-mono tnum flex h-7 w-11 items-center justify-center rounded-chip bg-ink text-paper">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[22px] font-medium tracking-[-0.02em]">{p.title}</span>
                <span className="t-body text-ink-soft">{p.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section-gap">
        <div className="container">
          <Reveal>
            <h2 className="t-h2">Who it&apos;s for</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-[4px] sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE_KEYS.map((k) => (
              <RevealItem key={k} className="flex">
                <a
                  href={`${base}/for/${k}`}
                  className="group/aud flex min-h-[180px] w-full flex-col justify-between rounded-card bg-paper p-6 transition-colors duration-[300ms] ease-out hover:bg-white"
                >
                  <span className="text-[14px] text-muted">{AUDIENCES[k].status}</span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-[22px] font-medium tracking-[-0.02em]">{AUDIENCES[k].name}</span>
                    <ArrowUpRight size={18} weight="bold" className="shrink-0 transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/aud:-translate-y-0.5 group-hover/aud:translate-x-0.5" />
                  </span>
                </a>
              </RevealItem>
            ))}
            {OTHERS.map((o) => (
              <RevealItem key={o} className="flex">
                <div className="flex min-h-[180px] w-full items-end rounded-card bg-sand p-6">
                  <span className="text-[18px] font-medium leading-tight tracking-[-0.02em]">{o}</span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

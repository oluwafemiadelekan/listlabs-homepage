import Link from "next/link";
import { InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/brand/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { HandleForm, ListingForm } from "@/components/ui/Field";

/** Try it: one centred line and one field, in the statement's manner. */
export function TryIt() {
  return (
    <section id="try" className="section-gap scroll-mt-6">
      <div className="container">
        <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <h2 className="t-h2">Get started right now</h2>
          <p className="t-body mt-3 text-ink-soft">Describe something you are listing.</p>
          <div className="mt-8 w-full text-left">
            <ListingForm className="mx-auto" />
          </div>
          <p className="t-caption max-w-[48ch] text-muted">
            No handle yet. Claim one when you want to keep it. Looking instead? Set a saved search after you start.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const SOCIAL = [
  { label: "X", Icon: XLogo },
  { label: "LinkedIn", Icon: LinkedinLogo },
  { label: "Instagram", Icon: InstagramLogo },
];

/** Close: one warm-black card with the line and the claim. Footer sits under it on cream. */
export function Close() {
  return (
    <>
      <section id="claim" className="section-gap scroll-mt-6">
        <div className="container">
          <Reveal>
            <div data-scene="dark" className="rounded-card bg-plum px-6 py-16 text-paper sm:px-12 sm:py-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <h2 className="t-h1 max-w-[12ch]">You&apos;re either first, or last.</h2>
                <div className="w-full lg:w-[440px]">
                  <HandleForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo size={18} />
        <nav aria-label="Legal" className="flex items-center gap-6">
          <Link href="#" className="t-small text-ink-soft transition-colors duration-[220ms] ease-out hover:text-ink">
            Privacy policy
          </Link>
          <Link href="#" className="t-small text-ink-soft transition-colors duration-[220ms] ease-out hover:text-ink">
            Terms &amp; conditions
          </Link>
        </nav>
        <ul className="m-0 flex list-none items-center gap-2 p-0">
          {SOCIAL.map(({ label, Icon }) => (
            <li key={label}>
              <a
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-pill bg-ink text-paper transition-[background-color,transform] duration-[260ms] ease-out hover:-translate-y-0.5 hover:bg-violet"
              >
                <Icon size={15} />
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/brand";
import { useClaim } from "@/components/claim/ClaimFlow";
import { EASE_OUT_EXPO } from "@/lib/motion";

export const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Who it's for", href: "#uses" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
] as const;

/** Logo left; small links and the one account button right. As quiet as the reference. */
export function Header() {
  const [open, setOpen] = useState(false);
  const claim = useClaim();
  return (
    <header className="relative z-30">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={`${BRAND.name} home`} className="rounded-pill">
          <Logo size={20} />
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group/nav relative text-[14px] text-ink-soft transition-colors duration-[240ms] ease-out hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/nav:scale-x-100" />
              </a>
            ))}
          </nav>
          <span className="hidden sm:block">
            <Button size="sm" arrow onClick={() => claim.open()}>
              {BRAND.ctaNav}
            </Button>
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-pill bg-ink text-paper transition-transform duration-[240ms] ease-out active:scale-95 md:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="container md:hidden"
          >
            <ul className="m-0 flex list-none flex-col gap-1 rounded-card bg-paper p-2 shadow-float">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-inner px-4 py-3 text-[16px] transition-colors duration-[200ms] hover:bg-sand">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="p-1 pt-2">
                <Button
                  arrow
                  className="w-full justify-between"
                  onClick={() => {
                    setOpen(false);
                    claim.open();
                  }}
                >
                  {BRAND.ctaNav}
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

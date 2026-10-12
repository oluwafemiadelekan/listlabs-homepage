"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowsOutSimple, Globe, LinkSimple, ListMagnifyingGlass, LockSimple, MapPin, UsersThree, X } from "@phosphor-icons/react";
import { useClaim } from "@/components/claim/ClaimFlow";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND, VISIBILITY, type VisibilityKey } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

const ICONS = { private: LockSimple, unlisted: LinkSimple, shared: UsersThree, listed: ListMagnifyingGlass, public: Globe };

import type { Example } from "@/lib/catalog";
export type { Example };

/*
  Example listings, taken from the client's own product screens (and the brand guide's Mustang),
  shown as one lister's own dashboard so the visibility levels make sense. No lister names:
  the brief bans named example people on the homepage.
*/
const EXAMPLES: Example[] = [
  {
    asset: "Real estate",
    price: "$2.4M",
    title: "Riverbend, 24-unit multifamily, value-add",
    location: "Austin, TX",
    image: "/images/apartment.jpg",
    alt: "A mid-century apartment block with rows of balconies",
    position: "50% 35%",
    stats: [["Cap rate", "6.8%"], ["NOI", "$0.2M"]],
    about: "Stabilised 24-unit asset two blocks from the new transit line. Below-market rents across 19 units.",
    visibility: "shared",
  },
  {
    asset: "Real estate",
    price: "$8.1M",
    title: "Cedar Industrial Park",
    location: "Denver, CO",
    image: "/images/warehouse.jpg",
    alt: "Warehouse aisles stacked with boxed goods on pallet racking",
    position: "50% 60%",
    stats: [["Cap rate", "7.2%"], ["NOI", "$0.6M"]],
    about: "Six-building light industrial campus, fully leased to 4 tenants.",
    visibility: "listed",
  },
  {
    asset: "Vehicles",
    price: "$940K",
    title: "Fleet disposal, 18 tractor units",
    location: "Location not specified",
    image: "/images/truck.jpg",
    alt: "A blue tractor unit pulling two trailers on a mountain road",
    position: "45% 50%",
    stats: [["Units", "18"], ["Model years", "2021 to 2023"]],
    about: "2021 to 2023 sleeper cabs, full service history, sold as one lot.",
    visibility: "unlisted",
  },
  {
    asset: "Collectibles",
    price: "$68,500",
    title: "1967 Mustang Fastback",
    location: "Location not specified",
    image: "/images/car.jpg",
    alt: "A red 1967 Mustang Fastback in a showroom",
    position: "55% 60%",
    stats: [["Year", "1967"], ["Body", "Fastback"]],
    about: "Two owners, matching numbers, kept indoors.",
    visibility: "private",
  },
];

/* ---------- Card: the whole card is a button that opens the details ---------- */

export function ListingCard({ l, onOpen }: { l: Example; onOpen: () => void }) {
  const v = VISIBILITY.find((x) => x.key === l.visibility)!;
  const Icon = ICONS[l.visibility];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${l.title}, ${l.price}. ${v.label}. Open details`}
      className="lc group/card flex h-full w-full cursor-pointer flex-col gap-[4px] rounded-card text-left"
    >
      <div className="lc-photo relative aspect-[4/3] w-full overflow-hidden rounded-card bg-plum">
        <Image
          src={l.image}
          alt={l.alt}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.05]"
          style={{ objectPosition: l.position }}
        />
        <span className="absolute left-3 top-3 rounded-chip bg-paper px-3 py-1 text-[12px] font-medium text-ink">{l.asset}</span>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-pill bg-paper text-ink opacity-0 transition-[opacity,transform] duration-[420ms] ease-[var(--ease-out-expo)] group-hover/card:opacity-100 group-focus-visible/card:opacity-100 [@media(hover:none)]:opacity-100"
        >
          <ArrowsOutSimple size={14} weight="bold" />
        </span>
      </div>
      {/* Fixed rows: price, a two-line title, one-line location, stats, then the visibility footer.
          Every card shares the same rhythm, so the stats and footers line up across the row. */}
      <div className="lc-body flex w-full flex-1 flex-col rounded-card bg-paper transition-colors duration-[300ms] ease-out group-hover/card:bg-white">
        <div className="flex flex-1 flex-col p-5">
          <div className="tnum text-[24px] font-medium leading-none tracking-[-0.03em]">{l.price}</div>
          <div className="mt-2 line-clamp-2 text-[14px] sm:min-h-[2lh] leading-[1.35] text-ink-soft">{l.title}</div>
          <div className="mt-2 flex min-w-0 items-center gap-1.5 text-[13px] text-muted">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{l.location}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-[4px]">
            {(l.stats ?? []).map(([k, val]) => (
              <div key={k} className="min-w-0 rounded-inner bg-cream px-3 py-2.5">
                <div className="truncate text-[12px] text-muted">{k}</div>
                <div className="tnum mt-0.5 truncate text-[15px] font-medium">{val}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 border-t border-line px-5 py-3.5 text-[13px]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-chip bg-violet-soft">
            <Icon size={13} weight="fill" className="text-violet" />
          </span>
          <span className="truncate">
            <span className="font-medium">{v.label}</span> <span className="text-ink-soft">· {v.who.replace(/\.$/, "")}</span>
          </span>
        </div>
      </div>
    </button>
  );
}

/* ---------- Details overlay ---------- */

export function ListingDetails({ l, onClose }: { l: Example; onClose: () => void }) {
  const lenis = useLenis();
  const claim = useClaim();
  const [level, setLevel] = useState<VisibilityKey>(l.visibility);
  const i = VISIBILITY.findIndex((v) => v.key === level);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.getElementById("page-root");
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    root?.setAttribute("inert", "");
    const t = window.setTimeout(() => document.getElementById("listing-close")?.focus(), 350);
    return () => {
      window.clearTimeout(t);
      lenis?.start();
      document.documentElement.style.overflow = "";
      root?.removeAttribute("inert");
      opener?.focus?.();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" data-lenis-prevent>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[var(--scrim)] backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="listing-title"
        className="relative max-h-[92svh] w-full max-w-[980px] overflow-y-auto rounded-t-[30px] bg-cream p-[4px] sm:rounded-panel"
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <div className="grid gap-[4px] md:grid-cols-[1.05fr_1fr]">
          {/* Photo */}
          <div className="relative min-h-[260px] overflow-hidden rounded-card bg-plum md:min-h-[520px]">
            <Image src={l.image} alt={l.alt} fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" style={{ objectPosition: l.position }} />
            <span className="absolute left-4 top-4 rounded-chip bg-paper px-3 py-1 text-[12px] font-medium text-ink">{l.asset}</span>
          </div>

          <div className="flex flex-col gap-[4px]">
            {/* Facts */}
            <div className="relative rounded-card bg-paper p-6">
              <button
                id="listing-close"
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-pill bg-cream text-ink transition-[background-color,transform] duration-[240ms] ease-out hover:bg-sand active:scale-95"
              >
                <X size={16} />
              </button>
              <div className="tnum text-[34px] font-medium leading-none tracking-[-0.03em]">{l.price}</div>
              <h3 id="listing-title" className="mt-3 pr-10 text-[18px] font-medium leading-[1.3] tracking-[-0.015em]">
                {l.title}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] text-muted">
                <MapPin size={15} />
                {l.location}
              </p>
              {l.stats && (
                <dl className="mt-5 grid grid-cols-2 gap-[4px]">
                  {l.stats.map(([k, val]) => (
                    <div key={k} className="rounded-inner bg-cream px-4 py-3">
                      <dt className="text-[12px] text-muted">{k}</dt>
                      <dd className="tnum m-0 mt-0.5 text-[17px] font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {l.about && <p className="mt-5 text-[14px] leading-[1.55] text-ink-soft">{l.about}</p>}
            </div>

            {/* Who sees it: change it right here */}
            <div className="rounded-card bg-paper p-6">
              <div className="text-[14px] font-medium">Who sees it</div>
              <div role="radiogroup" aria-label="Who sees this listing" className="mt-3 grid grid-cols-5 gap-[4px]">
                {VISIBILITY.map((v) => {
                  const Icon = ICONS[v.key];
                  const on = v.key === level;
                  return (
                    <button
                      key={v.key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setLevel(v.key)}
                      className={cn(
                        "relative isolate flex flex-col items-center gap-1.5 rounded-inner px-1 py-3 text-[12px] font-medium transition-colors duration-[300ms] ease-out",
                        on ? "text-paper" : "bg-cream text-ink-soft hover:bg-sand",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="detail-visibility"
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-inner bg-plum"
                          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        />
                      )}
                      <Icon size={17} weight={on ? "fill" : "regular"} className={on ? "text-violet-soft" : undefined} />
                      {v.label}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={level}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  className="mt-4 text-[14px] leading-[1.5]"
                >
                  <span className="font-medium">{VISIBILITY[i].label}.</span> <span className="text-ink-soft">{VISIBILITY[i].who}</span>
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Act */}
            <div className="flex flex-1 flex-col justify-end gap-3 rounded-card bg-sand p-6">
              <p className="text-[13px] text-ink-soft">A listing like this lives on your handle. {BRAND.helper}</p>
              <Button
                size="lg"
                arrow
                className="w-full justify-between"
                onClick={() => {
                  onClose();
                  window.setTimeout(() => claim.open(), 260);
                }}
              >
                {BRAND.ctaPrimary}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * The lister's own view after claiming a handle: "Your listings". It is the only place all five
 * visibility levels sit side by side, which is why the row is framed this way. A public homepage
 * must never look like it is showing someone's Private listing to strangers.
 * Each card opens its details, where the visibility can be changed in place.
 */
export function Listings() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // True only in the browser after hydration, so the portal never causes a hydration mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const counts = VISIBILITY.map((v) => ({ ...v, n: EXAMPLES.filter((e) => e.visibility === v.key).length }));

  return (
    <section aria-labelledby="your-listings" className="section-gap">
      <div className="container">
        <div className="rounded-panel bg-sand p-2 sm:p-[4px]">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 pb-4 pt-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-pill bg-plum text-[14px] font-medium text-paper">
                Y
              </span>
              <div>
                <h2 id="your-listings" className="text-[15px] font-medium leading-tight">
                  Your listings
                </h2>
                <p className="text-[13px] leading-tight text-muted">
                  {BRAND.handleDomain}/@your-handle
                </p>
              </div>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Listings by visibility">
              {counts.map((v) => {
                const Icon = ICONS[v.key];
                return (
                  <li
                    key={v.key}
                    className={
                      v.n
                        ? "inline-flex items-center gap-1.5 rounded-chip bg-paper px-3 py-1.5 text-[12px] font-medium text-ink"
                        : "inline-flex items-center gap-1.5 rounded-chip px-3 py-1.5 text-[12px] text-muted shadow-[inset_0_0_0_1px_var(--line-strong)]"
                    }
                  >
                    <Icon size={13} weight={v.n ? "fill" : "regular"} className={v.n ? "text-violet" : undefined} />
                    {v.label} <span className="tnum text-muted">{v.n}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 sm:gap-2 xl:grid-cols-4 xl:gap-[4px]">
            {EXAMPLES.map((l, idx) => (
              <RevealItem key={l.title} className="flex">
                <ListingCard l={l} onOpen={() => setOpenIndex(idx)} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
      {mounted &&
        createPortal(
          <AnimatePresence>{openIndex !== null && <ListingDetails key={openIndex} l={EXAMPLES[openIndex]} onClose={() => setOpenIndex(null)} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

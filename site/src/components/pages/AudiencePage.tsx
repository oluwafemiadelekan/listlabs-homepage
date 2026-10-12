"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CaretDown, Globe, LinkSimple, ListMagnifyingGlass, LockSimple, UsersThree } from "@phosphor-icons/react";
import { useClaim } from "@/components/claim/ClaimFlow";
import { ListingCard, ListingDetails } from "@/components/home/Listings";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Capsule } from "@/components/ui/Field";
import { BRAND } from "@/lib/brand";
import { CATALOG, type CatalogItem } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { AUDIENCES, AUDIENCE_KEYS, type AudienceKey } from "@/lib/site";

type Sort = "newest" | "high" | "low";
type Seen = "all" | "public" | "listed";

const SORTS: Record<Sort, { label: string; fn: (a: CatalogItem, b: CatalogItem) => number }> = {
  newest: { label: "Newest", fn: (a, b) => a.age - b.age },
  high: { label: "Price, high to low", fn: (a, b) => b.value - a.value },
  low: { label: "Price, low to high", fn: (a, b) => a.value - b.value },
};

const OPTION_ICON = { Shared: UsersThree, Unlisted: LinkSimple };

function Pill({ on, onClick, children, count }: { on: boolean; onClick: () => void; children: React.ReactNode; count?: number }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "relative isolate inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-chip px-3.5 text-[13px] font-medium transition-colors duration-[300ms] ease-out",
        on ? "text-paper" : "bg-paper text-ink-soft hover:text-ink",
      )}
    >
      {on && (
        <motion.span layoutId="filter-pill" aria-hidden="true" className="absolute inset-0 -z-10 rounded-chip bg-ink" transition={{ duration: 0.45, ease: EASE_OUT_EXPO }} />
      )}
      {children}
      {count !== undefined && <span className={cn("tnum", on ? "text-paper/60" : "text-muted")}>{count}</span>}
    </button>
  );
}

export function AudiencePage({ audience, base }: { audience: AudienceKey; base: string }) {
  const a = AUDIENCES[audience];
  const items = CATALOG[audience];
  const claim = useClaim();
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [category, setCategory] = useState("All");
  const [seen, setSeen] = useState<Seen>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [openId, setOpenId] = useState<string | null>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const shown = items
    .filter((i) => category === "All" || i.category === category)
    .filter((i) => seen === "all" || i.visibility === seen)
    .sort(SORTS[sort].fn);
  const open = items.find((i) => i.id === openId) ?? null;
  const OptionIcon = OPTION_ICON[a.option];
  const others = AUDIENCE_KEYS.filter((k) => k !== audience);

  return (
    <>
      {/* Heading row: the audience, the client's use-card line, and the visibility it leans on */}
      <section className="pt-[clamp(24px,5vh,56px)]">
        <div className="container">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <a href={`${base || ""}/#uses`} className="transition-colors duration-[200ms] hover:text-ink">
              Who it&apos;s for
            </a>
            <span aria-hidden="true"> / </span>
            <span className="text-ink-soft">{a.name}</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-12">
            <Reveal>
              <h1 className="t-h1">{a.name}</h1>
              <p className="t-body mt-4 max-w-[52ch] text-ink-soft">{a.lead}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-card bg-plum p-6 text-paper">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-paper/70">
                  <OptionIcon size={13} weight="bold" />
                  {a.option}
                </span>
                <h2 className="mt-3 text-[20px] font-medium leading-tight tracking-[-0.02em]">{a.status}</h2>
                <p className="mt-2 text-[14px] leading-[1.5] text-paper/75">{a.body}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section aria-label="Listings" className="pt-12 sm:pt-16">
        <div className="container">
          <div className="flex flex-col gap-3 rounded-panel bg-sand p-2 lg:flex-row lg:items-center lg:justify-between">
            <LayoutGroup id="category">
              <div className="-mx-2 flex gap-1 overflow-x-auto px-2 pb-1 lg:pb-0" role="group" aria-label="Category">
                {categories.map((c) => (
                  <Pill key={c} on={category === c} onClick={() => setCategory(c)} count={c === "All" ? items.length : items.filter((i) => i.category === c).length}>
                    {c}
                  </Pill>
                ))}
              </div>
            </LayoutGroup>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex w-full rounded-chip bg-paper p-0.5 sm:w-auto" role="group" aria-label="Who can see">
                {(["all", "public", "listed"] as Seen[]).map((v) => {
                  const Icon = v === "public" ? Globe : v === "listed" ? ListMagnifyingGlass : null;
                  return (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={seen === v}
                      onClick={() => setSeen(v)}
                      className={cn(
                        "inline-flex h-8 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-chip px-3 text-[13px] sm:flex-none transition-colors duration-[300ms] ease-out",
                        seen === v ? "bg-violet-soft font-medium text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {Icon && <Icon size={13} weight={seen === v ? "fill" : "regular"} className={seen === v ? "text-violet" : undefined} />}
                      {v === "all" ? "All levels" : v === "public" ? "Public" : "Listed"}
                    </button>
                  );
                })}
              </div>
              <label className="relative w-full sm:w-auto">
                <span className="sr-only">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-9 w-full appearance-none rounded-chip bg-paper pl-3.5 pr-9 text-[13px] font-medium text-ink outline-none transition-shadow duration-[240ms] focus-visible:shadow-[0_0_0_3px_var(--accent-ring)]"
                >
                  {(Object.keys(SORTS) as Sort[]).map((k) => (
                    <option key={k} value={k}>
                      {SORTS[k].label}
                    </option>
                  ))}
                </select>
                <CaretDown size={12} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </label>
            </div>
          </div>

          {/* Grid */}
          <motion.ul layout className="m-0 mt-2 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((l) => (
                <motion.li
                  key={l.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="flex min-w-0"
                >
                  <ListingCard l={{ ...l, asset: l.category }} onOpen={() => setOpenId(l.id)} />
                </motion.li>
              ))}
              <motion.li
                key="locked"
                layout
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                className="flex min-w-0"
              >
                <div className="flex w-full flex-col justify-between gap-8 rounded-card bg-plum p-6 text-paper">
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-chip bg-paper/10">
                      <LockSimple size={18} weight="fill" className="text-violet-soft" />
                    </span>
                    <p className="mt-6 text-[28px] font-medium leading-none tracking-[-0.03em] tnum">{a.hidden} more</p>
                    <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.5] text-paper/75">
                      {a.name} listings {a.hiddenAs}. You only see them once you have a handle and the lister lets you in.
                    </p>
                  </div>
                  <Button arrow className="w-full justify-between" onClick={() => claim.open()}>
                    {BRAND.ctaPrimary}
                  </Button>
                </div>
              </motion.li>
            </AnimatePresence>
          </motion.ul>
          {shown.length === 0 && (
            <p className="mt-6 text-center text-[14px] text-ink-soft">
              Nothing here with those filters.{" "}
              <button type="button" onClick={() => { setCategory("All"); setSeen("all"); }} className="font-medium text-ink underline underline-offset-4">
                Clear filters
              </button>
            </p>
          )}
        </div>
      </section>

      {/* Saved search */}
      <section className="section-gap">
        <div className="container">
          <div className="grid gap-[4px] lg:grid-cols-2">
            <div className="flex flex-col justify-end rounded-card bg-[linear-gradient(140deg,var(--wash-from)_0%,var(--wash-to)_100%)] p-7 sm:p-9">
              <h2 className="t-h2 max-w-[14ch]">Not seeing it?</h2>
              <p className="t-body mt-4 max-w-[44ch] text-ink-soft">
                You don&apos;t list what you want. You set a saved search. It watches. You hear about it when it shows up in your world.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 rounded-card bg-paper p-7 sm:p-9">
              <Capsule
                name="watch"
                placeholder={`Watch for ${a.name.toLowerCase()}…`}
                ariaLabel="What should your saved search watch for"
                action="Set a saved search"
                helper={BRAND.helper}
                onSubmitValue={(v) => {
                  claim.open({ search: v || undefined });
                }}
              />
              <p className="text-[13px] text-muted">
                Also see{" "}
                {others.map((k, i) => (
                  <span key={k}>
                    <a href={`${base}/for/${k}`} className="font-medium text-ink underline-offset-4 transition-colors duration-[200ms] hover:underline">
                      {AUDIENCES[k].name}
                    </a>
                    {i < others.length - 1 ? " and " : "."}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>{open && <ListingDetails key={open.id} l={{ ...open, asset: open.category }} onClose={() => setOpenId(null)} />}</AnimatePresence>,
          document.body,
        )}
    </>
  );
}

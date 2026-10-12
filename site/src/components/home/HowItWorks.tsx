"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarBlank, ChatsCircle, EnvelopeSimple, Globe, LinkSimple, ListMagnifyingGlass, LockSimple, ShareNetwork, UsersThree } from "@phosphor-icons/react";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/lib/brand";
import { VISIBILITY, type VisibilityKey } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* ---------- The five levels as reach: you in the centre, people lighting outward ---------- */

const COLS = 13;
const ROWS = 9;
const REACH: Record<VisibilityKey, number> = { private: 4, unlisted: 12, shared: 28, listed: 56, public: COLS * ROWS - 1 };

function ReachField({ level }: { level: VisibilityKey }) {
  const ranked = useMemo(() => {
    const cx = (COLS - 1) / 2;
    const cy = (ROWS - 1) / 2;
    const cells: { k: string; d: number; a: number }[] = [];
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) cells.push({ k: `${r}-${c}`, d: Math.hypot(c - cx, r - cy), a: Math.atan2(r - cy, c - cx) });
    const order = [...cells].sort((p, q) => p.d - q.d || p.a - q.a);
    const rank = new Map(order.map((x, i) => [x.k, i]));
    return cells.map((x) => ({ k: x.k, rank: rank.get(x.k)! }));
  }, []);
  const lit = REACH[level];
  return (
    <div className="grid gap-[5px]" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }} aria-hidden="true">
      {ranked.map((cell) => {
        const you = cell.rank === 0;
        const on = cell.rank <= lit;
        return (
          <span key={cell.k} className="flex aspect-square items-center justify-center">
            <span
              className={cn("block rounded-pill transition-[transform,opacity,background-color] ease-[var(--ease-out-expo)]", you ? "h-full w-full bg-violet" : "h-[70%] w-[70%]")}
              style={{
                background: you ? undefined : on ? "var(--paper)" : "rgba(255,255,255,0.14)",
                transform: on || you ? "scale(1)" : "scale(0.6)",
                transitionDuration: "700ms",
                transitionDelay: you ? "0ms" : `${Math.min(cell.rank * 6, 480)}ms`,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

function VisibilityTile() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(2);
  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % VISIBILITY.length), 2200);
    return () => window.clearInterval(t);
  }, [reduced]);
  const v = VISIBILITY[i];
  return (
    <div className="flex h-full flex-col justify-between rounded-tile bg-plum p-4 text-paper">
      <ReachField level={v.key} />
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={v.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="text-[15px] font-medium"
          >
            {v.label}
          </motion.span>
        </AnimatePresence>
        <span className="t-mono tnum text-paper/50">{i + 1}/5</span>
      </div>
    </div>
  );
}

function PhotoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full overflow-hidden rounded-tile bg-ink">
      <Image src={src} alt={alt} fill sizes="260px" className="object-cover" />
    </div>
  );
}

const LEVEL_ICONS = { private: LockSimple, unlisted: LinkSimple, shared: UsersThree, listed: ListMagnifyingGlass, public: Globe };

/** The five levels spelled out: the level on the left, who it reaches on the right, one row each. */
function Levels({ on }: { on: boolean }) {
  return (
    <dl className="m-0 grid gap-[4px]">
      {VISIBILITY.map((v) => {
        const Icon = LEVEL_ICONS[v.key];
        return (
          <div
            key={v.key}
            className={cn(
              "grid grid-cols-[104px_minmax(0,1fr)] items-center gap-3 rounded-inner px-3 py-2 transition-colors duration-[420ms] ease-out",
              on ? "bg-paper" : "bg-paper lg:bg-transparent",
            )}
          >
            <dt className="flex items-center gap-2 font-medium">
              <Icon size={14} weight="fill" className={cn("shrink-0 transition-colors duration-[420ms]", on ? "text-violet" : "text-violet lg:text-faint")} />
              {v.label}
            </dt>
            <dd className="m-0">{v.who}</dd>
          </div>
        );
      })}
    </dl>
  );
}

/** Promote it: a listing link going out to the places you already talk, and on through people you trust. */
function PromoteTile() {
  const reduced = useReducedMotion();
  const channels = [
    { label: "Email", Icon: EnvelopeSimple },
    { label: "Social", Icon: ChatsCircle },
    { label: "Meetup", Icon: CalendarBlank },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-4 rounded-tile bg-plum p-4 text-paper">
      <div className="flex min-w-0 items-center gap-2 rounded-inner bg-paper/10 px-3 py-2.5 text-[13px]">
        <LinkSimple size={14} className="shrink-0 text-violet-soft" />
        <span className="truncate">{BRAND.handleDomain}/@you/riverbend</span>
      </div>
      <div className="grid grid-cols-3 gap-[4px]">
        {channels.map(({ label, Icon }, i) => (
          <motion.div
            key={label}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.12 }}
            className="flex flex-col items-center gap-1.5 rounded-inner bg-paper/10 px-1 py-3 text-[12px]"
          >
            <Icon size={16} />
            {label}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.5 }}
        className="flex items-center gap-2 rounded-inner bg-violet px-3 py-2.5 text-[13px] text-paper"
      >
        <ShareNetwork size={14} weight="bold" className="shrink-0" />
        Shared by 2 people you trust
      </motion.div>
    </div>
  );
}

/** A line that thickens and carries a soft highlight left to right, leading the eye to the details. */
function LeadLine({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-[2px] overflow-hidden transition-opacity duration-[420ms] ease-out",
        on ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <span className="absolute inset-0 bg-ink/20" />
      <span className="lead-shimmer absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,transparent,var(--ink),transparent)]" />
    </span>
  );
}

/* ---------- Steps ---------- */

type Step = { title: string; body: (on: boolean) => ReactNode; media: ReactNode; mediaHeight?: string };

const STEPS: Step[] = [
  {
    title: "List it",
    body: () => "Describe what you have. Photos, docs, whatever helps. You get a listing you can change.",
    media: <PhotoTile src="/images/phone.jpg" alt="Hands photographing a product with a phone, ready to list it" />,
    mediaHeight: "h-[244px]",
  },
  {
    title: "Decide who sees it",
    body: (on) => <Levels on={on} />,
    media: <VisibilityTile />,
  },
  {
    title: "Promote it",
    body: () => "Drop the link on social, in email, at a meetup, anywhere you already talk. Or let someone you trust share it with their people.",
    media: <PromoteTile />,
    mediaHeight: "h-[236px]",
  },
];

/**
 * The reference's numbered rows. One row is active: its lines lead to the details on the right,
 * and a rounded tile floats beside it, gliding to whichever row you are on.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const rows = useRef<Array<HTMLLIElement | null>>([]);
  const [tileY, setTileY] = useState(0);

  useEffect(() => {
    const place = () => {
      const row = rows.current[active];
      const ol = list.current;
      if (!row || !ol) return;
      setTileY(row.offsetTop + row.offsetHeight / 2);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <section id="how" className="section-gap scroll-mt-6">
      <div className="container">
        <Reveal>
          <h2 className="t-h2">How it works</h2>
          <p className="t-body mt-4 max-w-[52ch] text-ink-soft">
            Looking is not a fourth step here. Set a saved search. It watches. You hear about it when it shows up in your world.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <ol ref={list} className="m-0 list-none border-b border-line p-0">
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.title}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  className="relative border-t border-line"
                  onMouseEnter={() => setActive(i)}
                >
                  <LeadLine on={on} className="top-0 -translate-y-1/2 max-lg:hidden" />
                  <LeadLine on={on} className="bottom-0 translate-y-1/2 max-lg:hidden" />
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className="grid w-full cursor-pointer gap-x-6 gap-y-3 py-6 text-left sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,340px)] sm:items-start lg:grid-cols-[auto_minmax(0,1fr)_260px_minmax(0,340px)]"
                  >
                    <span
                      className={cn(
                        "t-mono tnum flex h-7 w-11 items-center justify-center rounded-chip transition-[background-color,color,box-shadow] duration-[420ms] ease-out",
                        on ? "bg-ink text-paper" : "bg-ink text-paper sm:bg-transparent sm:text-muted sm:shadow-[inset_0_0_0_1px_var(--line-strong)]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-[20px] font-medium tracking-[-0.02em] transition-colors duration-[420ms] ease-out sm:pt-0.5", on ? "text-ink" : "text-ink sm:text-faint")}>
                      {s.title}
                    </span>
                    <span className="hidden lg:block" aria-hidden="true" />
                    <span className={cn("t-small block transition-colors duration-[420ms] ease-out sm:pt-1", on ? "text-ink" : "text-ink-soft sm:text-faint")}>
                      {s.body(on)}
                    </span>
                  </button>
                  <div className={cn("pb-6 lg:hidden", s.mediaHeight)}>{s.media}</div>
                </li>
              );
            })}
          </ol>

          {/* Floating tile, desktop: glides between rows */}
          <motion.div
            className="pointer-events-none absolute right-[calc(340px+24px)] top-0 hidden h-[236px] w-[260px] lg:block"
            initial={false}
            animate={{ y: tileY - 118 }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.9 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                {STEPS[active].media}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
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
    <div className="flex h-full flex-col justify-between rounded-[22px] bg-plum p-4 text-paper">
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
    <div className="relative h-full overflow-hidden rounded-[22px] bg-ink">
      <Image src={src} alt={alt} fill sizes="260px" className="object-cover" />
    </div>
  );
}

/* ---------- Steps ---------- */

type Step = { title: string; body: ReactNode; media: ReactNode };

const STEPS: Step[] = [
  {
    title: "List it",
    body: "Describe what you have. Photos, docs, whatever helps. You get a listing you can change.",
    media: <PhotoTile src="/images/camera.jpg" alt="A silver Leica M3 camera, the kind of thing you would list" />,
  },
  {
    title: "Decide who sees it",
    body: (
      <ul className="m-0 flex list-none flex-col gap-1 p-0">
        {VISIBILITY.map((v) => (
          <li key={v.key}>
            <span className="font-medium">{v.label}.</span> {v.who}
          </li>
        ))}
      </ul>
    ),
    media: <VisibilityTile />,
  },
  {
    title: "Promote it",
    body: "Drop the link on social, in email, at a meetup, anywhere you already talk. Or let someone you trust share it with their people.",
    media: <PhotoTile src="/images/guitar.jpg" alt="Two vintage guitars, a listing being shared" />,
  },
];

/**
 * The reference's numbered rows. One row is active; a rounded tile floats beside it
 * and glides to whichever row you are on.
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
    <section id="how" className="scroll-mt-6 pt-24 sm:pt-32">
      <div className="container">
        <div className="grid gap-5 sm:grid-cols-[1fr_minmax(0,300px)] sm:items-end">
          <Reveal>
            <h2 className="t-h2">How it works</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="t-small text-ink-soft">
              Looking is not a fourth step here. Set a saved search. It watches. You hear about it when it shows up in your world.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-10">
          <ol ref={list} className="m-0 list-none border-b border-line p-0">
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.title}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  className="border-t border-line"
                  onMouseEnter={() => setActive(i)}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className="grid w-full cursor-pointer gap-x-6 gap-y-3 py-6 text-left sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,300px)] sm:items-start lg:grid-cols-[auto_minmax(0,1fr)_260px_minmax(0,300px)]"
                  >
                    <span
                      className={cn(
                        "t-mono tnum flex h-7 w-11 items-center justify-center rounded-pill transition-[background-color,color,box-shadow] duration-[420ms] ease-out",
                        on ? "bg-ink text-paper" : "bg-ink text-paper sm:bg-transparent sm:text-muted sm:shadow-[inset_0_0_0_1px_var(--line-strong)]",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-[20px] font-medium tracking-[-0.02em] transition-colors duration-[420ms] ease-out sm:pt-0.5", on ? "text-ink" : "text-ink sm:text-faint")}>
                      {s.title}
                    </span>
                    <span className="hidden lg:block" aria-hidden="true" />
                    <span className={cn("t-small transition-colors duration-[420ms] ease-out sm:pt-1", on ? "text-ink" : "text-ink-soft sm:text-faint")}>
                      {s.body}
                    </span>
                  </button>
                  <div className={cn("pb-6 lg:hidden", i === 1 ? "" : "h-[244px]")}>{s.media}</div>
                </li>
              );
            })}
          </ol>

          {/* Floating tile, desktop: glides between rows */}
          <motion.div
            className="pointer-events-none absolute right-[calc(300px+24px)] top-0 hidden h-[236px] w-[260px] lg:block"
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

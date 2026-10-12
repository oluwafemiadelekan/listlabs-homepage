"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

type Photo = { src: string; alt: string; position?: string };
/** A cell inside one photo's segment, in percent of that segment: x, y, width, height. */
type Cell = [number, number, number, number];

const GAP = 4;
const T = 100 / 3;

/*
  Desktop: a 14-unit grid, three rows of cells, so a square is 2x2 units and a wide rectangle 4x2.
  Three photos, each one continuous image cut into cells:
    photo 1 (4 units):  square, square / wide / square, square
    photo 2 (6 units):  wide, square / square, wide / wide, square
    photo 3 (4 units):  wide / square, square / wide
  Mobile: the middle photo alone, filling the rest of the screen: wide / square, square / wide.
  The strip grows to fill the hero, so the first screen is always exactly full.
*/
const R = 100 / 3;
const LAYOUTS: { units: number; cells: Cell[] }[] = [
  { units: 4, cells: [[0, 0, 50, R], [50, 0, 50, R], [0, R, 100, R], [0, 2 * R, 50, R], [50, 2 * R, 50, R]] },
  {
    units: 6,
    cells: [
      [0, 0, 2 * T, R], [2 * T, 0, T, R],
      [0, R, T, R], [T, R, 2 * T, R],
      [0, 2 * R, 2 * T, R], [2 * T, 2 * R, T, R],
    ],
  },
  { units: 4, cells: [[0, 0, 100, R], [0, R, 50, R], [50, R, 50, R], [0, 2 * R, 100, R]] },
];
const MOBILE_CELLS: Cell[] = [[0, 0, 100, R], [0, R, 50, R], [50, R, 50, R], [0, 2 * R, 100, R]];

function Cuts({ cells, delay, className }: { cells: Cell[]; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {cells.map(([x, y, w, h], i) => (
        <div key={i} className="absolute overflow-hidden" style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}>
          <motion.div
            className="absolute rounded-cell"
            style={{
              left: x > 0.1 ? GAP / 2 : 0,
              top: y > 0.1 ? GAP / 2 : 0,
              right: x + w < 99.9 ? GAP / 2 : 0,
              bottom: y + h < 99.9 ? GAP / 2 : 0,
              boxShadow: "0 0 0 120px var(--cream)",
            }}
            initial={reduced ? false : { scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: delay + 0.05 * i }}
          />
        </div>
      ))}
    </div>
  );
}

function Segment({ photo, cells, mobileCells, delay, priority }: { photo: Photo; cells: Cell[]; mobileCells?: Cell[]; delay: number; priority?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
          style={{ objectPosition: photo.position ?? "center" }}
        />
      </motion.div>
      {mobileCells ? (
        <>
          <Cuts cells={mobileCells} delay={delay} className="md:hidden" />
          <Cuts cells={cells} delay={delay} className="hidden md:block" />
        </>
      ) : (
        <Cuts cells={cells} delay={delay} />
      )}
    </div>
  );
}

/** One photo strip cut into rounded squares and wide rectangles, 4px apart. Grows to fill its parent. */
export function CellStrip({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={cn("grid min-h-[300px] grid-cols-1 gap-[4px] md:min-h-[380px] md:grid-cols-[4fr_6fr_4fr]", className)}>
      {photos.slice(0, 3).map((p, i) => (
        <div key={p.src} className={cn("h-full", i !== 1 && "hidden md:block")}>
          <Segment photo={p} cells={LAYOUTS[i].cells} mobileCells={i === 1 ? MOBILE_CELLS : undefined} delay={0.15 + i * 0.12} priority={i === 1} />
        </div>
      ))}
    </div>
  );
}

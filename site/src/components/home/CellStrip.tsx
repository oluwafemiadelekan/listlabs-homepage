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
  The strip sits on a 14-unit grid, two rows tall, so a square is 2x2 units and a
  wide rectangle is 4x2. Three photos, each one continuous image cut into cells:
    photo 1 (4 units):  square, square / wide
    photo 2 (6 units):  wide, square  / square, wide
    photo 3 (4 units):  wide / square, square
  Squares and wide rectangles alternate across both rows, as in the reference.
*/
const LAYOUTS: { units: number; cells: Cell[] }[] = [
  { units: 4, cells: [[0, 0, 50, 50], [50, 0, 50, 50], [0, 50, 100, 50]] },
  { units: 6, cells: [[0, 0, 2 * T, 50], [2 * T, 0, T, 50], [0, 50, T, 50], [T, 50, 2 * T, 50]] },
  { units: 4, cells: [[0, 0, 100, 50], [0, 50, 50, 50], [50, 50, 50, 50]] },
];

function Segment({ photo, cells, delay, priority }: { photo: Photo; cells: Cell[]; delay: number; priority?: boolean }) {
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
      {cells.map(([x, y, w, h], i) => (
        <div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute overflow-hidden"
          style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
        >
          <motion.div
            className="absolute rounded-cell"
            style={{
              left: x > 0.1 ? GAP / 2 : 0,
              top: y > 0.1 ? GAP / 2 : 0,
              right: x + w < 99.9 ? GAP / 2 : 0,
              bottom: y + h < 99.9 ? GAP / 2 : 0,
              boxShadow: "0 0 0 80px var(--cream)",
            }}
            initial={reduced ? false : { scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: delay + 0.06 * i }}
          />
        </div>
      ))}
    </div>
  );
}

/** One photo strip cut into rounded squares and wide rectangles, 4px apart. */
export function CellStrip({ photos, className }: { photos: Photo[]; className?: string }) {
  return (
    <div className={cn("grid aspect-[6/4] grid-cols-1 gap-[4px] md:aspect-[14/4] md:grid-cols-[4fr_6fr_4fr]", className)}>
      {photos.slice(0, 3).map((p, i) => (
        <div key={p.src} className={cn("h-full", i !== 1 && "hidden md:block")}>
          <Segment photo={p} cells={LAYOUTS[i].cells} delay={0.15 + i * 0.12} priority={i === 1} />
        </div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

export type Photo = { src: string; alt: string; position?: string };
/** A photo that is a listing: its card sits on its own bottom-left cell. */
export type Product = Photo & { price: string; title: string; place: string };
/** A cell inside one photo's segment, in percent of that segment: x, y, width, height. */
type Cell = [number, number, number, number];

const GAP = 4;
const T = 100 / 3;
const R = 100 / 3;

/*
  A 14-column grid, three rows tall: a square is 2 columns by 1 row, a wide rectangle 4 by 1.
  Three continuous photos, each one listing, each cut into rounded cells:
    photo 1 (cols 1 to 4):   wide / square, square / wide
    photo 2 (cols 5 to 10):  wide, square / square, wide / wide, square
    photo 3 (cols 11 to 14): square, square / square, square / wide
  Every photo's bottom-left cell is wide, and the listing's white card sits in it, so the price
  and details read as part of the picture. Mobile: photo 2 alone.
*/
const LAYOUTS: Cell[][] = [
  [[0, 0, 100, R], [0, R, 50, R], [50, R, 50, R], [0, 2 * R, 100, R]],
  [[0, 0, 2 * T, R], [2 * T, 0, T, R], [0, R, T, R], [T, R, 2 * T, R], [0, 2 * R, 2 * T, R], [2 * T, 2 * R, T, R]],
  [[0, 0, 50, R], [50, 0, 50, R], [0, R, 50, R], [50, R, 50, R], [0, 2 * R, 100, R]],
];
/** Width of each photo's bottom-left cell, in percent of the photo, so the card never crosses a gap. */
const CARD_CELL = [100, 2 * T, 100];
const MOBILE_CELLS: Cell[] = [[0, 0, 100, R], [0, R, 50, R], [50, R, 50, R], [0, 2 * R, 100, R]];
const SEGMENT_COLS = ["md:col-[1/5]", "col-[1/-1] md:col-[5/11]", "md:col-[11/15]"];

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

function Segment({ photo, cells, mobileCells, cardCell, delay, priority, className }: { photo: Product; cells: Cell[]; mobileCells?: Cell[]; cardCell: number; delay: number; priority?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("relative row-[1/4] overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay }}
      >
        <Image src={photo.src} alt={photo.alt} fill priority={priority} sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" style={{ objectPosition: photo.position ?? "center" }} />
      </motion.div>
      {mobileCells ? (
        <>
          <Cuts cells={mobileCells} delay={delay} className="md:hidden" />
          <Cuts cells={cells} delay={delay} className="hidden md:block" />
        </>
      ) : (
        <Cuts cells={cells} delay={delay} />
      )}
      <ListingChip p={photo} delay={delay + 0.5} cardCell={cardCell} mobile={Boolean(mobileCells)} />
    </div>
  );
}

/** The listing's white card, inside the photo's bottom-left cell. */
function ListingChip({ p, delay, cardCell, mobile }: { p: Product; delay: number; cardCell: number; mobile: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.figcaption
      className={cn("absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4", mobile ? "max-md:max-w-[calc(100%-24px)]" : undefined)}
      style={{ maxWidth: `calc(${cardCell}% - 32px)` }}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      <span className="block rounded-inner bg-paper px-4 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
        <span className="tnum block text-[clamp(18px,1.4vw,22px)] font-medium leading-tight tracking-[-0.025em] text-ink">{p.price}</span>
        <span className="mt-1 block truncate text-[13px] leading-tight text-ink">{p.title}</span>
        <span className="mt-0.5 block truncate text-[12px] leading-tight text-muted">{p.place}</span>
      </span>
    </motion.figcaption>
  );
}

/** The hero strip: three listings, each a photo cut into cells with its card on it. Grows to fill its parent. */
export function CellStrip({ photos, className }: { photos: Product[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid min-h-[360px] grid-cols-6 grid-rows-[1fr_1fr_1fr] gap-[4px] md:min-h-[420px] md:grid-cols-[repeat(14,minmax(0,1fr))]",
        className,
      )}
    >
      {photos.slice(0, 3).map((p, i) => (
        <Segment
          key={p.src}
          photo={p}
          cells={LAYOUTS[i]}
          mobileCells={i === 1 ? MOBILE_CELLS : undefined}
          cardCell={CARD_CELL[i]}
          delay={0.15 + i * 0.12}
          priority={i === 1}
          className={cn(SEGMENT_COLS[i], i !== 1 && "hidden md:block")}
        />
      ))}
    </div>
  );
}

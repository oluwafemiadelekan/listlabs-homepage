"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

export type Photo = { src: string; alt: string; position?: string };
export type Product = Photo & { price: string; line: string };
/** A cell inside one photo's segment, in percent of that segment: x, y, width, height. */
type Cell = [number, number, number, number];

const GAP = 4;
const T = 100 / 3;

/*
  The strip sits on a 14-column grid, three rows tall, so a square is 2 columns by 1 row and a
  wide rectangle 4 by 1.
  Rows 1 and 2: three continuous photos, each cut into rounded cells.
    photo 1 (cols 1 to 4):   square, square / wide
    photo 2 (cols 5 to 10):  wide, square / square, wide
    photo 3 (cols 11 to 14): wide / square, square
  Row 3: five separate products with a price and one fact, edges aligned to the photos above:
    wide (1 to 4), square (5 to 6), wide (7 to 10), square (11 to 12), square (13 to 14).
  Mobile: photo 2 alone over two products. The strip grows to fill the hero.
*/
const LAYOUTS: Cell[][] = [
  [[0, 0, 50, 50], [50, 0, 50, 50], [0, 50, 100, 50]],
  [[0, 0, 2 * T, 50], [2 * T, 0, T, 50], [0, 50, T, 50], [T, 50, 2 * T, 50]],
  [[0, 0, 100, 50], [0, 50, 50, 50], [50, 50, 50, 50]],
];
const MOBILE_CELLS: Cell[] = [[0, 0, 100, 50], [0, 50, 50, 50], [50, 50, 50, 50]];
const SEGMENT_COLS = ["md:col-[1/5]", "col-[1/-1] md:col-[5/11]", "md:col-[11/15]"];
const PRODUCT_COLS = ["col-[1/5] md:col-[1/5]", "col-[5/7] md:col-[5/7]", "md:col-[7/11]", "md:col-[11/13]", "md:col-[13/15]"];

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

function Segment({ photo, cells, mobileCells, delay, priority, className }: { photo: Photo; cells: Cell[]; mobileCells?: Cell[]; delay: number; priority?: boolean; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("relative row-[1/3] overflow-hidden", className)}>
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
    </div>
  );
}

function ProductCell({ p, delay, className }: { p: Product; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.figure
      className={cn("relative row-[3/4] m-0 overflow-hidden rounded-cell bg-plum", className)}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay }}
    >
      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover" style={{ objectPosition: p.position ?? "center" }} />
      <figcaption className="absolute bottom-2 left-2 max-w-[calc(100%-16px)]">
        <span className="block rounded-inner bg-paper px-3 py-2">
          <span className="tnum block text-[15px] font-medium leading-tight tracking-[-0.02em] text-ink">{p.price}</span>
          <span className="block truncate text-[12px] leading-tight text-muted">{p.line}</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

/** The hero strip: cut photos over a row of products. Grows to fill its parent. */
export function CellStrip({ photos, products, className }: { photos: Photo[]; products: Product[]; className?: string }) {
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
          delay={0.15 + i * 0.12}
          priority={i === 1}
          className={cn(SEGMENT_COLS[i], i !== 1 && "hidden md:block")}
        />
      ))}
      {products.slice(0, 5).map((p, i) => (
        <ProductCell key={p.src} p={p} delay={0.55 + i * 0.08} className={cn(PRODUCT_COLS[i], i > 1 && "hidden md:block")} />
      ))}
    </div>
  );
}

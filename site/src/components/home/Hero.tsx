"use client";

import { motion } from "motion/react";
import { HandleForm } from "@/components/ui/Field";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { CellStrip } from "./CellStrip";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

/**
 * The hero fills the rest of the first screen under the header: headline row at the top,
 * photo strip anchored to the bottom. Nothing below it peeks in.
 */
export function Hero() {
  return (
    <section className="flex flex-1 flex-col pb-[clamp(16px,3vh,32px)] pt-[clamp(16px,4vh,48px)]">
      <div className="container flex flex-1 flex-col gap-[clamp(20px,4vh,48px)]">
        {/* Headline, then the claim directly beneath it */}
        <div>
          <motion.h1 {...rise(0.08)} className="t-h1">
            <span className="sm:block">List what you have. </span>
            <span className="sm:block">Look for what you want.</span>
          </motion.h1>
          <motion.div {...rise(0.3)} className="mt-6 w-full max-w-[460px] sm:mt-8">
            <HandleForm />
          </motion.div>
        </div>

        <CellStrip
          className="flex-1"
          photos={[
            { src: "/images/carshow.jpg", alt: "Three restored classic cars with their hoods up at a car show", position: "40% 55%" },
            { src: "/images/waterfront.jpg", alt: "Modern apartment buildings around a waterfront square", position: "50% 55%" },
            { src: "/images/marina.jpg", alt: "Sailboats moored in rows along a marina", position: "50% 40%" },
          ]}
          products={[
            { src: "/images/hvac.jpg", alt: "A technician working on a building's heating system", position: "50% 35%", price: "$3.3M", line: "Northgate HVAC · 9% growth" },
            { src: "/images/watch.jpg", alt: "A vintage dress watch on a leather strap", position: "45% 45%", price: "$18,500", line: "1960s dress watch" },
            { src: "/images/retail.jpg", alt: "Shoppers on a busy street lined with storefronts", position: "50% 45%", price: "$4.6M", line: "Mill Street retail strip · 6.1% cap" },
            { src: "/images/hotel.jpg", alt: "The ornate facade of a grand hotel", position: "50% 40%", price: "$5.0M", line: "Hospitality note" },
            { src: "/images/records.jpg", alt: "A hand pulling a record from shelves of vinyl", position: "40% 50%", price: "$42,000", line: "1,200 LP collection" },
          ]}
        />

      </div>
    </section>
  );
}

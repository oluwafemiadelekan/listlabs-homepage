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
            { src: "/images/carshow.jpg", alt: "Three restored classic cars with their hoods up at a car show", position: "40% 80%", price: "$210,000", title: "Three Bel Airs, sold as a set", place: "Fresno, CA" },
            { src: "/images/waterfront.jpg", alt: "Modern apartment buildings around a waterfront square", position: "50% 55%", price: "$14.8M", title: "Harbour District mixed-use redevelopment", place: "Portland, OR" },
            { src: "/images/hotel.jpg", alt: "The ornate facade of a grand hotel", position: "50% 85%", price: "$5.0M", title: "Mezzanine note, hospitality portfolio", place: "Location not specified" },
          ]}
        />

      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { Binoculars, Eye } from "@phosphor-icons/react";
import { HandleForm } from "@/components/ui/Field";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { CellStrip } from "./CellStrip";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_OUT_EXPO, delay },
});

export function Hero() {
  return (
    <section className="pt-6 sm:pt-10">
      <div className="container">
        {/* Headline left, claim right, exactly the reference's top row */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-10">
          <div>
            <motion.h1 {...rise(0.08)} className="t-h1">
              <span className="lg:block">List what you have. </span>
              <span className="lg:block">Look for what you want.</span>
            </motion.h1>
          </div>
          <motion.div {...rise(0.3)} className="w-full">
            <HandleForm />
          </motion.div>
        </div>

        <CellStrip
          className="mt-10 sm:mt-12"
          photos={[
            { src: "/images/car.jpg", alt: "A red 1967 Mustang Fastback in a showroom", position: "55% 60%" },
            { src: "/images/camera.jpg", alt: "A silver Leica M3 rangefinder camera", position: "50% 50%" },
            { src: "/images/shop.jpg", alt: "A bakery interior with glass display cases", position: "50% 55%" },
          ]}
        />

        {/* The centred statement, with one phrase set in an outlined pill */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-20 max-w-[860px] text-center sm:mt-28"
        >
          <p className="t-statement">
            You get a listing, and{" "}
            <span className="inline-flex translate-y-[-0.06em] items-center gap-1.5 whitespace-nowrap rounded-pill px-3 py-0.5 align-middle text-[0.9em] shadow-[inset_0_0_0_1.5px_var(--violet)]">
              <Eye size="0.8em" weight="bold" className="text-violet" />
              you choose who sees it.
            </span>{" "}
            Looking is a saved search{" "}
            <span className="inline-flex h-[1.05em] w-[1.05em] translate-y-[0.12em] items-center justify-center rounded-pill bg-violet align-baseline text-paper">
              <Binoculars size="0.6em" weight="bold" />
            </span>{" "}
            that watches. Not a want-ad. Not one public catalog.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

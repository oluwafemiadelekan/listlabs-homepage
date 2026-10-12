"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Tuned for a light, fluid feel: lerp 0.11 follows the wheel closely without the
 * rubbery trail of lower values. Lenis runs inside Motion's frame loop so scroll
 * and animation update in the same frame instead of two competing rAF loops.
 */
const LENIS_OPTIONS = {
  lerp: 0.11,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  autoRaf: false,
} as const;

const EXPO_OUT = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Every page starts at the top. Browsers restore the old scroll position on reload, on back and
 * forward, and when a page comes back from the back-forward cache; Lenis then carries on from that
 * restored spot. We take scroll restoration over and reset to the top, unless the URL has a #section,
 * in which case we glide to it.
 */
function StartAtTop() {
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const reset = () => {
      const target = location.hash ? document.querySelector<HTMLElement>(location.hash) : null;
      if (target) {
        lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
        window.setTimeout(() => lenis?.scrollTo(target, { offset: -72, duration: 1.3, easing: EXPO_OUT, force: true }), 120);
        return;
      }
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    };
    reset();
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) reset();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, [lenis]);

  return null;
}

/**
 * Every in-page anchor scrolls through Lenis with an eased duration.
 * Nothing on the page jumps.
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      const offset = -72;
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.3, easing: EXPO_OUT });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      try {
        history.replaceState(null, "", hash);
      } catch {}
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/**
 * Lenis smooth scroll on the whole page.
 * Reduced motion gets native scrolling, with smooth anchors still.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduced) return;
    const update = ({ timestamp }: { timestamp: number }) => lenisRef.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduced]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced) {
    return (
      <>
        <StartAtTop />
        <AnchorScroll />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root ref={lenisRef} options={LENIS_OPTIONS}>
      <StartAtTop />
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}

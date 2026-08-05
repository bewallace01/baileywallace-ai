"use client";

import { useEffect } from "react";

/**
 * Mounts a single IntersectionObserver that toggles `.is-visible` on any
 * element with `.reveal` once it enters the viewport. No re-runs on exit.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealAll = () =>
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("is-visible");
      });

    // No observer support, or the visitor asked for less motion: just show it.
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      // Positive bottom margin extends the root *past* the fold, so a section
      // starts animating before it scrolls into view. The old negative margin
      // waited until it was already on screen, which read as a blank flash
      // when scrolling fast.
      { rootMargin: "0px 0px 25% 0px", threshold: 0 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

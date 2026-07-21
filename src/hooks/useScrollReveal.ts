import { useRef, type RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Reveals every `[data-reveal]` element inside the returned ref as it
 * scrolls into view, batching triggers so groups animate together.
 * No-ops (elements stay visible, no motion) under prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current);

          if (reduced) {
            gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
            return;
          }

          gsap.set(targets, { opacity: 0, y: 32 });

          // ScrollTrigger.batch measures every target's position via
          // getBoundingClientRect immediately on creation. Every section on
          // the page runs this same setup in its mount layout effect, so
          // without deferring, all of them fire in the same tick as the
          // preloader's first animation frames — the burst of layout reads
          // stalls the main thread right when the preloader is trying to
          // paint smoothly. Pushing the batch creation to the next frame
          // lets that first paint land uncontested.
          const raf = requestAnimationFrame(() => {
            ScrollTrigger.batch(targets, {
              start: "top 85%",
              once: true,
              onEnter: (batch) =>
                gsap.to(batch, {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  stagger: 0.12,
                  overwrite: true,
                }),
            });
          });

          return () => cancelAnimationFrame(raf);
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return scope;
}

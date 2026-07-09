"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is "current" for scroll-spy nav highlighting: the
 * last section whose top has scrolled past a reference line near the top
 * of the viewport. Unlike an intersection-ratio approach, this stays
 * correct for short sections and large anchor-jump scrolls.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const reference = window.scrollY + window.innerHeight * 0.35;

      let current = elements[0].id;
      for (const el of elements) {
        if (el.offsetTop <= reference) {
          current = el.id;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

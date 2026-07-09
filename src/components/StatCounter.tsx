"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = numberRef.current;
      if (!el) return;
      const counter = { n: 0 };

      ScrollTrigger.create({
        trigger: scope.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            n: value,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.n).toString();
            },
          });
        },
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      data-reveal
      className="group flex flex-col gap-1.5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        <span ref={numberRef}>0</span>
        {suffix}
      </div>
      <p className="text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}

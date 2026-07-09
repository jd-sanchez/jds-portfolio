"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { identity } from "@/data/content";
import { MagneticButton } from "@/components/MagneticButton";
import { BeamsBackground } from "@/components/ui/beams-background";

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        () => {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.set("[data-hero-reveal]", { opacity: 0, y: 28 }).to("[data-hero-reveal]", {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          });

          return () => tl.kill();
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section id="hero" ref={scope} className="relative">
      <BeamsBackground intensity="subtle">
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 pt-32 pb-24 text-center">
          <span
            data-hero-reveal
            className="font-mono text-sm font-semibold tracking-[0.35em] uppercase text-foreground"
          >
            {identity.title}
          </span>

          <h1
            data-hero-reveal
            className="font-display max-w-5xl text-6xl font-extrabold leading-[0.98] tracking-tighter text-foreground sm:text-8xl lg:text-9xl"
          >
            {identity.name}
          </h1>

          <p
            data-hero-reveal
            className="max-w-2xl font-mono text-lg leading-relaxed tracking-tight text-muted sm:text-xl"
          >
            {identity.tagline}
          </p>

          <div data-hero-reveal className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton
              href="/resume.pdf"
              variant="solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Let&apos;s Connect
            </MagneticButton>
          </div>
        </div>
      </BeamsBackground>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </a>
    </section>
  );
}

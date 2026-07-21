"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { identity } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export function Preloader() {
  const [done, setDone] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const group = groupRef.current;
      const wordEl = wordRef.current;
      if (!root || !group || !wordEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          document.body.style.overflow = "hidden";

          let cancelled = false;
          let tl: gsap.core.Timeline | null = null;
          let split: SplitText | null = null;

          // The morph target is measured off the real (custom-font) glyph
          // metrics below. Building the timeline before the font has
          // actually swapped in would animate against fallback-font
          // measurements, then visibly snap once the real font arrives
          // mid-animation — exactly the kind of hitch this guards against.
          // document.fonts.ready is already resolved almost immediately in
          // practice (next/font preloads), so this costs no perceptible delay.
          document.fonts.ready.then(() => {
            if (cancelled) return;

            split = new SplitText("[data-preloader-chars]", {
              type: "chars",
              charsClass: "preloader-char",
            });

            tl = gsap.timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                document.body.style.overflow = "";
                setDone(true);
              },
            });

            if (reduced) {
              tl.set(split.chars, { opacity: 0 })
                .to(split.chars, { opacity: 1, duration: 0.4, stagger: 0.02 })
                .to(root, { autoAlpha: 0, duration: 0.5, delay: 0.4 });
              return;
            }

            const counter = { value: 0 };

            // Measure where the small nav logo lives so the big loader word
            // can land straight into it. We tween `font-size` (on the word)
            // plus a translate (on the group) instead of `scale` — scaling
            // text via transform rasterizes it once and resamples, which
            // reads as a soft blur while it moves. Shrinking the real font
            // size keeps every frame crisply re-rendered.
            const brandMark = document.querySelector("[data-brand-mark]");
            let morph: { x: number; y: number; fontSize: number } | null = null;
            let revealOrigin: { x: number; y: number } | null = null;

            if (brandMark) {
              const brandStyle = getComputedStyle(brandMark);
              const targetFontSize = brandStyle.fontSize;

              // Tailwind's `text-9xl` (h1's original size) and the brand
              // mark's `text-3xl` each bundle their own line-height ratio —
              // they land on the same px font-size at this breakpoint but
              // don't share a ratio, so wordEl still reports a taller/shorter
              // box than the real mark even at the identical font-size. Pin
              // wordEl's line-height to the brand mark's actual ratio (as a
              // unitless number, so it keeps recomputing as font-size tweens)
              // before measuring, so the shrunk box's height genuinely matches.
              const brandLineHeightRatio =
                parseFloat(brandStyle.lineHeight) / parseFloat(brandStyle.fontSize);
              gsap.set(wordEl, { lineHeight: brandLineHeightRatio });

              const previousInlineFontSize = wordEl.style.fontSize;
              wordEl.style.fontSize = targetFontSize;
              const shrunkRect = wordEl.getBoundingClientRect();
              wordEl.style.fontSize = previousInlineFontSize;

              const smallRect = brandMark.getBoundingClientRect();
              morph = {
                x: smallRect.left - shrunkRect.left,
                y: smallRect.top - shrunkRect.top,
                fontSize: parseFloat(targetFontSize),
              };
              revealOrigin = {
                x: smallRect.left + smallRect.width / 2,
                y: smallRect.top + smallRect.height / 2,
              };
            }

            tl.set(group, { transformOrigin: "0% 0%", willChange: "transform" })
              .set(split.chars, {
                opacity: 0,
                yPercent: 120,
                rotateX: -60,
                willChange: "transform, opacity",
              })
              .set("[data-preloader-bar-fill]", { scaleX: 0 })
              .to(split.chars, {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                duration: 0.9,
                stagger: 0.045,
                ease: "back.out(1.7)",
              })
              .to(
                counter,
                {
                  value: 100,
                  duration: 1.7,
                  ease: "power2.inOut",
                  onUpdate: () => {
                    if (counterRef.current) {
                      counterRef.current.textContent = String(
                        Math.round(counter.value)
                      ).padStart(3, "0");
                    }
                  },
                },
                "<0.1"
              )
              .to(
                "[data-preloader-bar-fill]",
                { scaleX: 1, duration: 1.7, ease: "power2.inOut" },
                "<"
              )
              .to(
                "[data-preloader-meta]",
                { opacity: 0, y: -8, duration: 0.35, ease: "power2.out" },
                "+=0.2"
              );

            if (morph) {
              tl.addLabel("land")
                .to(
                  wordEl,
                  { fontSize: morph.fontSize, duration: 0.9, ease: "power4.inOut" },
                  "land"
                )
                .to(
                  group,
                  { x: morph.x, y: morph.y, duration: 0.9, ease: "power4.inOut" },
                  "land"
                )
                // The dot + underline only appear once the word has (almost)
                // finished shrinking into place, so the landed logo matches
                // the real nav mark exactly before the page fades in behind
                // it — no mismatched glyph popping in mid-fade.
                .to(
                  "[data-preloader-dot], [data-preloader-underline]",
                  { opacity: 1, duration: 0.4, ease: "power2.out" },
                  "land+=0.55"
                );

              if (revealOrigin) {
                // Let the landed logo sit for a beat — an instant cut the
                // moment it settles reads as abrupt — then open the page
                // through an iris centered on the logo instead of a flat
                // fade, so the reveal itself feels like it's emanating from
                // where it landed.
                const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
                const reveal = { r: 0 };

                tl.to(
                  reveal,
                  {
                    r: maxRadius,
                    duration: 1.2,
                    ease: "power3.inOut",
                    onUpdate: () => {
                      const mask = `radial-gradient(circle at ${revealOrigin.x}px ${revealOrigin.y}px, transparent ${reveal.r}px, black ${reveal.r + 1}px)`;
                      root.style.maskImage = mask;
                      root.style.webkitMaskImage = mask;
                    },
                  },
                  "land+=1.25"
                );
              } else {
                tl.to(root, { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, "land+=1.25");
              }
            } else {
              tl.to(root, { autoAlpha: 0, duration: 0.5 }, "+=0.1");
            }
          });

          return () => {
            cancelled = true;
            split?.revert();
            tl?.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope }
  );

  if (done) return null;

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="fixed inset-0 z-[999] overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <div ref={groupRef} className="flex flex-col items-start">
          <h1 className="[perspective:800px]">
            {/*
              Font-size, weight, tracking, and color all live on this span —
              not on the <h1> — for two reasons. (1) `tracking-tight`'s `em`
              letter-spacing resolves against whichever element declares it;
              on the (unanimated) h1 it'd stay frozen at the big size as this
              span shrinks. (2) more importantly, an h1 sized via `text-9xl`
              etc. carries its own big bundled line-height that never
              shrinks (only this span's inline font-size is tweened), which
              left ~13px of invisible space below the shrunk glyphs that the
              real brand mark (a plain, unwrapped span) doesn't have — enough
              to throw the underline's position off by several pixels. With
              no font-size of its own, the h1 just hugs this span's actual
              (animating) size.
            */}
            <span
              ref={wordRef}
              className="inline-block text-7xl font-display font-extrabold tracking-tight text-foreground sm:text-8xl lg:text-9xl"
            >
              <span data-preloader-chars className="inline-block">
                {identity.initials}
              </span>
              <span data-preloader-dot className="text-muted opacity-0">
                .
              </span>
            </span>
          </h1>
          <span
            data-preloader-underline
            className="mt-1 block h-[3px] w-6 rounded-full bg-foreground opacity-0"
          />
        </div>

        <div data-preloader-meta className="flex w-64 flex-col items-center gap-2 sm:w-80">
          <div className="h-px w-full overflow-hidden bg-border">
            <div data-preloader-bar-fill className="h-full w-full origin-left bg-foreground" />
          </div>
          <div className="flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            <span>Loading</span>
            <span ref={counterRef}>000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

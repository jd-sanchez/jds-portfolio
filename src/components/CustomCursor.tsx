"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";
const IDLE_SIZE = 26;
const PADDING = 8;

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const activeTargetRef = useRef<Element | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const active = fine && !reduced;

    setEnabled(active);
    if (active) document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;

      const dot = dotRef.current;
      const box = boxRef.current;
      const labelEl = labelRef.current;
      if (!dot || !box || !labelEl) return;

      // Center every element on its (x, y) coordinate via GSAP itself —
      // once GSAP owns `transform` for position/scale, any Tailwind
      // translate/scale utility class on these elements would be silently
      // overwritten (inline style always beats a stylesheet class rule).
      gsap.set([dot, box], { xPercent: -50, yPercent: -50 });
      gsap.set(box, { width: IDLE_SIZE, height: IDLE_SIZE });
      gsap.set(labelEl, { xPercent: -50, yPercent: -140, opacity: 0 });

      const setDotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
      const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
      const setBoxX = gsap.quickTo(box, "x", { duration: 0.35, ease: "power3.out" });
      const setBoxY = gsap.quickTo(box, "y", { duration: 0.35, ease: "power3.out" });
      const setLabelX = gsap.quickTo(labelEl, "x", { duration: 0.15, ease: "power3.out" });
      const setLabelY = gsap.quickTo(labelEl, "y", { duration: 0.15, ease: "power3.out" });

      const handleMove = (e: MouseEvent) => {
        setDotX(e.clientX);
        setDotY(e.clientY);
        setLabelX(e.clientX);
        setLabelY(e.clientY);
        if (!activeTargetRef.current) {
          setBoxX(e.clientX);
          setBoxY(e.clientY);
        }
      };

      const handleEnter = (e: MouseEvent) => {
        const target = e.currentTarget as Element;
        activeTargetRef.current = target;
        setHovering(true);
        setLabel(target.getAttribute("data-cursor-label"));

        const rect = target.getBoundingClientRect();
        gsap.to(box, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width + PADDING * 2,
          height: rect.height + PADDING * 2,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const handleLeave = (e: MouseEvent) => {
        const target = e.currentTarget as Element;
        if (target !== activeTargetRef.current) return;

        activeTargetRef.current = null;
        setHovering(false);
        setLabel(null);
        gsap.to(box, { width: IDLE_SIZE, height: IDLE_SIZE, duration: 0.35, ease: "power3.out" });
      };

      const handleDown = () => gsap.to(dot, { scale: 0.7, duration: 0.15 });
      const handleUp = () => gsap.to(dot, { scale: 1, duration: 0.15 });

      const targets = Array.from(document.querySelectorAll(HOVER_SELECTOR));
      // mouseenter/mouseleave fire exactly once per element (unlike
      // mouseover/mouseout, which re-fire for every nested icon/tooltip
      // boundary crossed), so attaching them directly avoids spurious
      // resets while hovering inside a target.
      targets.forEach((el) => {
        el.addEventListener("mouseenter", handleEnter as EventListener);
        el.addEventListener("mouseleave", handleLeave as EventListener);
      });

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mousedown", handleDown);
      window.addEventListener("mouseup", handleUp);

      return () => {
        targets.forEach((el) => {
          el.removeEventListener("mouseenter", handleEnter as EventListener);
          el.removeEventListener("mouseleave", handleLeave as EventListener);
        });
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mousedown", handleDown);
        window.removeEventListener("mouseup", handleUp);
      };
    },
    { dependencies: [enabled] }
  );

  useGSAP(
    () => {
      if (!enabled || !labelRef.current) return;
      gsap.to(labelRef.current, {
        opacity: label ? 1 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    },
    { dependencies: [label, enabled] }
  );

  if (!enabled) return null;

  const cornerBase = "absolute size-3 border-foreground transition-opacity duration-300";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[100] size-1.5 rounded-full bg-foreground transition-opacity duration-200 ${
          hovering ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        ref={boxRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100]"
      >
        <span
          className={`${cornerBase} top-0 left-0 border-t-[3px] border-l-[3px] ${hovering ? "opacity-100" : "opacity-70"}`}
        />
        <span
          className={`${cornerBase} top-0 right-0 border-t-[3px] border-r-[3px] ${hovering ? "opacity-100" : "opacity-70"}`}
        />
        <span
          className={`${cornerBase} bottom-0 left-0 border-b-[3px] border-l-[3px] ${hovering ? "opacity-100" : "opacity-70"}`}
        />
        <span
          className={`${cornerBase} bottom-0 right-0 border-b-[3px] border-r-[3px] ${hovering ? "opacity-100" : "opacity-70"}`}
        />
      </div>

      <div
        ref={labelRef}
        aria-hidden="true"
        className="surface-strong pointer-events-none fixed top-0 left-0 z-[100] whitespace-nowrap px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
      >
        {label}
      </div>
    </>
  );
}

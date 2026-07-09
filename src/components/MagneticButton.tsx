"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  target?: string;
  rel?: string;
};

export function MagneticButton({
  href,
  children,
  className = "",
  variant = "solid",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const { contextSafe } = useGSAP({ scope: ref });

  const handleMove = contextSafe((e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power3.out" });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 will-change-transform";
  const variants = {
    solid: "bg-foreground text-background hover:opacity-85",
    outline: "surface hover:border-border-strong hover:bg-surface-strong",
  }[variant];

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${variants} ${className}`}
    >
      {children}
    </a>
  );
}

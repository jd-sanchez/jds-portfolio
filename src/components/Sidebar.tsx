"use client";

import { useRef } from "react";
import {
  Briefcase,
  FolderGit2,
  GitCommitHorizontal,
  Mail,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { nav } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { gsap, useGSAP } from "@/lib/gsap";

const icons: Record<string, LucideIcon> = {
  "#about": User,
  "#experience": Briefcase,
  "#projects": FolderGit2,
  "#github": GitCommitHorizontal,
  "#skills": Sparkles,
  "#contact": Mail,
};

const sectionIds = nav.map((item) => item.href.slice(1));

export function Sidebar() {
  const active = useActiveSection(sectionIds);

  const railIndicatorRef = useRef<HTMLDivElement>(null);
  const railItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const dockIndicatorRef = useRef<HTMLDivElement>(null);
  const dockItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const hasPositioned = useRef(false);

  useGSAP(
    () => {
      const activeRailItem = railItemRefs.current[active];
      const activeDockItem = dockItemRefs.current[active];
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const method = reduced || !hasPositioned.current ? gsap.set : gsap.to;

          if (activeRailItem && railIndicatorRef.current) {
            method(railIndicatorRef.current, {
              x: activeRailItem.offsetLeft,
              y: activeRailItem.offsetTop,
              duration: 0.45,
              ease: "power3.out",
            });
          }

          if (activeDockItem && dockIndicatorRef.current) {
            method(dockIndicatorRef.current, {
              x: activeDockItem.offsetLeft,
              y: activeDockItem.offsetTop,
              duration: 0.45,
              ease: "power3.out",
            });
          }

          hasPositioned.current = true;
        }
      );

      return () => mm.revert();
    },
    { dependencies: [active] }
  );

  return (
    <>
      {/* Desktop: vertical icon rail, centered on the left edge */}
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full surface p-2 md:flex"
      >
        <div
          ref={railIndicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 size-11 rounded-full bg-foreground"
        />
        {nav.map((item) => {
          const Icon = icons[item.href];
          const isActive = active === item.href.slice(1);

          return (
            <a
              key={item.href}
              ref={(el) => {
                railItemRefs.current[item.href.slice(1)] = el;
              }}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className={`relative z-10 group flex size-11 items-center justify-center rounded-full transition-colors ${
                isActive ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-[18px]" aria-hidden="true" />
              <span
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-border bg-surface-strong px-2 py-1 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile: horizontal icon dock, pinned to the bottom */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-fit items-center gap-1 rounded-full surface p-2 md:hidden"
      >
        <div
          ref={dockIndicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 size-11 rounded-full bg-foreground"
        />
        {nav.map((item) => {
          const Icon = icons[item.href];
          const isActive = active === item.href.slice(1);

          return (
            <a
              key={item.href}
              ref={(el) => {
                dockItemRefs.current[item.href.slice(1)] = el;
              }}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              className={`relative z-10 flex size-11 items-center justify-center rounded-full transition-colors ${
                isActive ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-[18px]" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </>
  );
}

"use client";

import { useState } from "react";
import { skills } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Tag } from "@/components/Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Skills() {
  const scope = useScrollReveal<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skills[activeIndex];

  return (
    <section id="skills" ref={scope} className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading eyebrow="Skills" title="What I build with." />

      <div data-reveal className="mt-14">
        <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-border" role="tablist">
          {skills.map((group, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={group.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(index)}
                className={`relative cursor-pointer px-0.5 pt-2 pb-4 font-mono text-xs uppercase tracking-[0.25em] transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {group.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-[2px] origin-left bg-foreground transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div key={activeIndex} role="tabpanel" className="animate-fade-in mt-8 flex flex-wrap gap-3">
          {active.items.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
}

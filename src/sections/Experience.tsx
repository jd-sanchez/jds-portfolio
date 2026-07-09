"use client";

import { experience } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Experience() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="experience" ref={scope} className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built."
        description="Full-stack and systems work across a wellness app, a browser engine, and client products."
      />

      <ol className="mt-14 flex flex-col gap-10 border-l border-border pl-8 sm:pl-10">
        {experience.map((job) => (
          <li key={job.company} data-reveal className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-background bg-foreground sm:-left-[calc(2.5rem+5px)]"
            />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-semibold">
                {job.role} <span className="text-muted">· {job.company}</span>
              </h3>
              <p className="font-mono text-xs text-muted whitespace-nowrap">
                {job.start} — {job.end}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted">{job.location}</p>

            <div className="mt-4 flex max-w-2xl flex-col gap-3">
              {job.highlights.map((point) => (
                <p key={point} className="text-sm leading-relaxed text-muted sm:text-base">
                  {point}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

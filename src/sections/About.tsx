"use client";

import { identity, stats } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCounter } from "@/components/StatCounter";
import { Highlight } from "@/components/Highlight";
import { Tag } from "@/components/Tag";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function About() {
  const scope = useScrollReveal<HTMLElement>();
  const [internships, fullStackProducts] = stats;

  return (
    <section id="about" ref={scope} className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            Building things that{" "}
            <span className="underline decoration-4 underline-offset-4">matter.</span>
          </>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-6">
          <p data-reveal className="text-xl font-bold leading-snug text-foreground">
            I&apos;m Jerico, a <Highlight>Full-Stack &amp; AI Developer</Highlight>.
          </p>

          <p data-reveal className="text-lg leading-relaxed text-muted">
            I recently graduated from the{" "}
            <Highlight>University of the Philippines Los Baños</Highlight>. I build products
            that put <Highlight>AI</Highlight> at the center, think business first and user
            always, and enjoy working across both <Highlight>mobile</Highlight> and{" "}
            <Highlight>web</Highlight>.
          </p>

          <p data-reveal className="text-lg leading-relaxed text-muted">
            Over the past few years I have picked up experience across{" "}
            <Highlight>internships, startup work, and full-stack projects</Highlight>, taking
            products from an idea to something real users rely on.
          </p>

          <p data-reveal className="text-lg leading-relaxed text-muted">
            Outside of code, I am usually <Highlight>studying</Highlight>, deep in a{" "}
            <Highlight>game</Highlight>, lifting at the <Highlight>gym</Highlight>, or at
            the movies catching whatever just came out.
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-col gap-8 lg:border-l lg:border-border lg:pl-10"
        >
          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
              <span className="size-1.5 bg-foreground" aria-hidden="true" />
              Education
            </p>
            <p className="mt-4 font-display text-xl font-bold tracking-tight">
              {identity.education.school}
            </p>
            <p className="text-sm text-muted">{identity.education.degree}</p>
            <p className="mt-1 font-mono text-xs text-muted">{identity.education.years}</p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted">
              Relevant coursework
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {identity.education.coursework.map((course) => (
                <Tag key={course}>{course}</Tag>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
            <StatCounter {...internships} />
            <StatCounter {...fullStackProducts} />
          </div>
        </div>
      </div>
    </section>
  );
}

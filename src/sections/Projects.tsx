"use client";

import { projects } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Projects() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="projects" ref={scope} className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Projects"
        title="Built, not just imagined."
        description="Full-stack AI products built and deployed end to end, from idea to something users actually open."
      />

      <div className="mt-14 flex flex-col gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

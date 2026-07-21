import type { ElementType } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectEntry } from "@/data/content";
import { Tag } from "@/components/Tag";

export function ProjectCard({ project, index }: { project: ProjectEntry; index: number }) {
  const Wrapper: ElementType = project.liveUrl ? "a" : "div";
  const linkProps = project.liveUrl
    ? {
        href: project.liveUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "data-cursor-label": "View",
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      data-reveal
      className="group relative -mx-4 flex flex-col gap-6 border-t border-border px-4 py-8 transition-colors last:border-b hover:bg-surface/60 sm:flex-row sm:items-center sm:gap-8"
    >
      <div className="relative w-full shrink-0 overflow-hidden rounded-xl border border-border bg-surface sm:w-64">
        <div className="relative aspect-video w-full">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 640px) 16rem, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col">
              <div className="flex items-center gap-1.5 border-b border-border bg-surface-strong px-3 py-2">
                <span className="size-2 rounded-full bg-border-strong" aria-hidden="true" />
                <span className="size-2 rounded-full bg-border-strong" aria-hidden="true" />
                <span className="size-2 rounded-full bg-border-strong" aria-hidden="true" />
              </div>
              <div
                className="flex flex-1 items-center justify-center bg-[repeating-linear-gradient(135deg,var(--surface)_0px,var(--surface)_10px,var(--surface-strong)_10px,var(--surface-strong)_20px)] transition-colors duration-300 group-hover:bg-[repeating-linear-gradient(135deg,var(--surface-strong)_0px,var(--surface-strong)_10px,var(--surface)_10px,var(--surface)_20px)]"
                aria-hidden="true"
              >
                <span className="font-display text-3xl font-extrabold tracking-tight text-muted/50">
                  {project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-3">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 right-0 hidden font-display text-7xl font-extrabold text-transparent [-webkit-text-stroke:1px_var(--border-strong)] transition-colors duration-300 group-hover:[-webkit-text-stroke:1px_var(--foreground)] sm:block"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-3xl font-extrabold tracking-tight transition-[text-decoration-color] group-hover:underline group-hover:decoration-4 group-hover:underline-offset-4 sm:text-4xl">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-muted">{project.date}</span>
        </div>
        <p className="max-w-md text-base text-muted sm:text-lg">{project.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted">{project.description}</p>

        {project.liveUrl && (
          <span className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-foreground">
            View Project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

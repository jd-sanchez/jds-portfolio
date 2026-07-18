"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { GithubHeatmap } from "@/components/GithubHeatmap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ContributionCalendar } from "@/types/github";

export function GithubActivity() {
  const scope = useScrollReveal<HTMLElement>();
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-activity")
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json() as Promise<ContributionCalendar>;
      })
      .then((data) => {
        if (!cancelled) setCalendar(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" ref={scope} className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeading
        eyebrow="Activity"
        title="Shipping in public."
        description="A year of commits, straight from GitHub."
      />

      <div data-reveal className="surface mt-14 p-6 sm:p-8">
        {failed ? (
          <p className="text-muted text-sm">
            Couldn&apos;t load GitHub activity right now. See it live on{" "}
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-2 underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        ) : (
          <GithubHeatmap calendar={calendar} />
        )}
      </div>
    </section>
  );
}

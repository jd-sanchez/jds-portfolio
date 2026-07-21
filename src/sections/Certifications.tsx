"use client";

import type { ComponentType, ElementType, SVGProps } from "react";
import { Check, ExternalLink } from "lucide-react";
import { certifications } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";
import { AnthropicLogo, DataCampLogo } from "@/components/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const issuerMeta: Record<
  string,
  { logo: ComponentType<SVGProps<SVGSVGElement>>; color: string }
> = {
  DataCamp: { logo: DataCampLogo, color: "#03EF62" },
  Anthropic: { logo: AnthropicLogo, color: "#D97757" },
};

export function Certifications() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section
      id="certifications"
      ref={scope}
      className="relative mx-auto max-w-5xl px-6 py-28"
    >
      <SectionHeading eyebrow="Certifications" title="Credentials I've earned." />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {certifications.map((cert) => {
          const Wrapper: ElementType = cert.credentialUrl ? "a" : "div";
          const linkProps = cert.credentialUrl
            ? {
                href: cert.credentialUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-cursor-label": "View",
              }
            : {};
          const meta = issuerMeta[cert.issuer];
          const Logo = meta?.logo;
          const color = meta?.color ?? "var(--foreground)";

          return (
            <SpotlightCard key={cert.name} data-reveal className="group relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-28 z-10 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-28 z-10 size-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-background"
              />

              <Wrapper {...linkProps} className="relative flex h-full items-stretch">
                <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-3 border-r border-dashed border-border-strong px-4 py-8">
                  <div className="relative">
                    <div
                      className="flex size-14 items-center justify-center rounded-full border-2 border-dashed"
                      style={{ borderColor: `${color}55` }}
                    >
                      <div className="flex size-11 items-center justify-center overflow-hidden rounded-full">
                        {Logo && <Logo className="size-full" aria-hidden="true" />}
                      </div>
                    </div>
                    <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-surface bg-foreground text-background">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                    Verified
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                      {cert.issuer}
                    </p>
                    <h3 className="font-display text-lg leading-snug font-bold tracking-tight">
                      {cert.name}
                    </h3>
                  </div>

                  {cert.credentialUrl && (
                    <span className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase transition-colors group-hover:text-foreground">
                      View Credential
                      <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  )}
                </div>
              </Wrapper>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}

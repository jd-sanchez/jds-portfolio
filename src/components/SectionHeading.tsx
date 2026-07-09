import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  hideDot?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  hideDot = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} max-w-2xl`}>
      <span
        data-reveal
        className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase text-muted"
      >
        {!hideDot && <span className="inline-block size-1.5 bg-foreground" aria-hidden="true" />}
        {eyebrow}
      </span>
      <h2
        data-reveal
        className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="text-muted text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

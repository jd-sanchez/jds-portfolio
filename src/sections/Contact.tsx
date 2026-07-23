"use client";

import { contact } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";

const links = [
  { label: "GitHub", href: contact.github, Icon: GithubIcon },
  { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinIcon },
];

export function Contact() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={scope}
      className="relative mx-auto max-w-5xl px-6 py-28 text-center"
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something worth shipping."
        align="center"
        hideDot
      />

      <div data-reveal className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3">
        <p className="text-muted">
          Open to Full Stack Development and AI Engineering roles. Feel free to reach out.
        </p>
        <p className="text-muted">
          You can reach me at{" "}
          <a
            href={`mailto:${contact.email}`}
            data-cursor-label="Email"
            className="font-bold text-foreground underline decoration-2 underline-offset-4 transition-colors hover:text-muted"
          >
            {contact.email}
          </a>
          .
        </p>
      </div>

      <ContactForm />

      <div data-reveal className="mt-10 flex items-center justify-center gap-4">
        {links
          .filter((link) => link.href)
          .map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
      </div>
    </section>
  );
}

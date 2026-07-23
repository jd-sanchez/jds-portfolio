"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, TriangleAlert } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdnaegw";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-border-strong focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        data-reveal
        className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-10 text-center"
      >
        <span className="flex size-11 items-center justify-center rounded-full border-2 border-foreground">
          <Check className="size-5" strokeWidth={3} aria-hidden="true" />
        </span>
        <p className="font-display text-lg font-bold tracking-tight">Message sent.</p>
        <p className="text-sm text-muted">Thanks for reaching out — I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      data-reveal
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder="What's on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cursor-label="Send"
        className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border-strong bg-foreground px-6 py-3 font-mono text-xs tracking-[0.2em] text-background uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </button>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}

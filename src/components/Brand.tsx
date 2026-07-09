import { identity } from "@/data/content";

export function Brand() {
  return (
    <a
      href="#hero"
      aria-label={`${identity.name} home`}
      className="group fixed top-4 left-4 z-40 -m-2 block p-2 sm:top-6 sm:left-6"
    >
      <span className="font-display text-2xl font-extrabold tracking-tight text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-3xl">
        {identity.initials}
        <span className="text-muted">.</span>
      </span>
      <span
        aria-hidden="true"
        className="mt-1 block h-[3px] w-6 rounded-full bg-foreground transition-all duration-300 ease-out group-hover:w-full"
      />
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import { identity } from "@/data/content";

function useManilaTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Footer() {
  const time = useManilaTime();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {identity.name}
        </p>

        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="size-1.5 animate-pulse rounded-full bg-foreground" aria-hidden="true" />
          Manila, PH{time && ` · ${time}`}
        </span>
      </div>
    </footer>
  );
}

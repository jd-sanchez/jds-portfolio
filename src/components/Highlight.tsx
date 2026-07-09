import type { ReactNode } from "react";

export function Highlight({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-foreground">{children}</strong>;
}

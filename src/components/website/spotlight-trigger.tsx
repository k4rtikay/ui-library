"use client";

import { Search } from "lucide-react";

export function SpotlightTrigger() {
  return (
    <button
      onClick={() => document.dispatchEvent(new Event("open-cmdk"))}
      className="group flex gap-2 w-full max-w-sm items-center justify-between rounded-md border border-border bg-muted/50 px-2 py-1 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      <div className="flex items-center gap-2 text-xs tracking-wide">
        <Search className="h-4 w-4" />
        <span>Search documentation...</span>
      </div>
      <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs font-light text-foreground sm:block">
        <span className="text-[10px]">⌘</span>K
      </kbd>
    </button>
  );
}
"use client";

import { Search } from "lucide-react";

export function SpotlightTrigger() {
  return (
    <button
      onClick={() => document.dispatchEvent(new Event("open-cmdk"))}
      className="group flex w-full max-w-sm items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span>Search documentation...</span>
      </div>
      <kbd className="hidden rounded bg-white/10 px-2 py-0.5 text-xs font-light text-zinc-400 group-hover:text-zinc-300 sm:block">
        <span className="text-[10px]">⌘</span>K
      </kbd>
    </button>
  );
}
"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpotlightTrigger() {
    return (
        <Button
            onClick={() => document.dispatchEvent(new Event("open-cmdk"))}
            aria-haspopup="dialog"
            variant="outline"
            className="relative group flex gap-2 max-w-sm items-center justify-between rounded-xl bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground transition-colors hover:border-border hover:text-foreground shadow-md dark:shadow-(--elevation-md)"
        >
            <div className="flex items-center gap-2 text-xs tracking-wide mr-8">
                <Search className="h-4 w-4" />
                <span>Search documentation...</span>
            </div>
            <kbd className="pointer-events-none absolute right-3 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded border border-border bg-background px-1.5 font-mono text-[11px] text-muted-foreground shadow-sm">
                <span className="text-[10px]">⌘ </span>K
            </kbd>
        </Button>
    );
}

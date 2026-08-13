"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpotlightTrigger() {
    return (
        <Button
            onClick={() => document.dispatchEvent(new Event("open-cmdk"))}
            aria-haspopup="dialog"
            variant="outline"
            className="group flex gap-2 max-w-sm items-center justify-between rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground transition-colors hover:border-border hover:text-foreground shadow-md dark:shadow-(--elevation-md)"
        >
            <div className="flex items-center gap-2 text-xs tracking-wide">
                <Search className="h-4 w-4" />
                <span>Search documentation...</span>
            </div>
            <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs font-light text-foreground sm:block">
                <span className="text-[10px]">⌘ </span>K
            </kbd>
        </Button>
    );
}

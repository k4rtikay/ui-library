"use client";

import { useEffect, useRef, type ChangeEvent } from "react";
import { Search } from "@/components/hugeicons";

interface SidebarSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SidebarSearch({ value, onChange }: SidebarSearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            const isTyping =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.tagName === "SELECT" ||
                target?.isContentEditable;

            if (
                event.key !== "/" ||
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                isTyping
            ) {
                return;
            }

            event.preventDefault();
            inputRef.current?.focus();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative mt-2 w-full">
            <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
            />
            <input
                ref={inputRef}
                type="search"
                value={value}
                onChange={handleChange}
                placeholder="Filter components..."
                aria-label="Filter components"
                className="h-9 w-full rounded-xl border border-border bg-secondary pl-9 pr-10 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded border border-border bg-background px-1.5 font-mono text-[11px] text-muted-foreground shadow-sm">
                /
            </kbd>
        </div>
    );
}

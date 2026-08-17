"use client";

// import { usePathname } from "next/navigation";
import NavRoutes from "./nav-routes";
import { Box, Search } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="hidden h-dvh w-64 shrink-0 self-start border-r-2 px-4 py-4 text-sm md:sticky md:top-0 md:flex md:flex-col md:gap-4">
            <h1 className="text-2xl font-semibold">Flow-Kit</h1>
            <div className="w-full flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <Box className="size-4" />
                <span>
                    v0.1.0{" "}
                    <span className="ml-2 bg-accent text-accent-foreground rounded-full py-1 px-2">
                        Beta
                    </span>
                </span>
            </div>
            
            <div className="relative w-full">
                <Search
                    className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    placeholder="Filter components..."
                    className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-10 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
                />
                <kbd className="pointer-events-none absolute right-2 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded border border-border bg-background px-1.5 font-mono text-[11px] text-muted-foreground shadow-sm">
                    /
                </kbd>
            </div>

            <NavRoutes />
        </aside>
    );
}

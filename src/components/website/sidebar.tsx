"use client";

// import { usePathname } from "next/navigation";
import NavRoutes from "./nav-routes";
import { Box, Search } from "lucide-react";
import SidebarCtaCard from "./sidebar-cta-card";


interface SidebarProps {
    isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
    return (
        <aside
            id="docs-sidebar"
            className="bg-sidebar hidden h-dvh w-64 shrink-0 self-start px-4 py-4 text-sm md:sticky md:top-0 md:flex md:flex-col md:gap-4"
            data-collapsed={isCollapsed}
            aria-hidden={isCollapsed}
            inert={isCollapsed}
        >
            <header className="flex flex-col gap-2">
                <h2 className="mt-6 text-xl font-semibold">Flow-Kit</h2>
                <div className="w-full flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <Box className="size-4" />
                    <span>
                        v0.1.0{" "}
                        <span className="text-xs bg-accent text-accent-foreground rounded-full border-1 border-border py-1 px-2">
                            Beta
                        </span>
                    </span>
                </div>

                <div className="relative w-full mt-2">
                    <Search
                        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        placeholder="Filter components..."
                        className="h-9 w-full rounded-xl border border-border bg-secondary pl-9 pr-10 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded border border-border bg-background px-1.5 font-mono text-[11px] text-muted-foreground shadow-sm">
                        /
                    </kbd>
                </div>
            </header>

            <nav className="min-h-0 flex-1 overflow-y-auto">
                <NavRoutes />
            </nav>

            <footer className="shrink-0">
                {/* planned footer content */}
                <SidebarCtaCard />
            </footer>
        </aside>
    );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import NavRoutes from "./nav-routes";
import { Box } from "@/components/hugeicons";
import SidebarCtaCard from "./sidebar-cta-card";
import SidebarSearch from "./sidebar-search";

interface SidebarProps {
    isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <aside
            id="docs-sidebar"
            className="bg-sidebar hidden h-dvh w-64 shrink-0 self-start px-4 py-4 text-sm md:sticky md:top-0 md:flex md:flex-col md:gap-4"
            data-collapsed={isCollapsed}
            aria-hidden={isCollapsed}
            inert={isCollapsed}
        >
            <header className="flex flex-col gap-2">
                <h2 className="mt-6 flex items-center gap-2 text-xl font-semibold">
                    <Image
                        src="/icon.png"
                        alt="Flow-Kit logo"
                        width={28}
                        height={28}
                        className="size-6 shrink-0 shadow-sm rounded-full"
                    />
                    <span>Flow-Kit</span>
                </h2>
                <div className="mt-1 w-full flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <Box className="size-4" />
                    <span>
                        v0.1.0{" "}
                        <span className="text-xs bg-accent text-accent-foreground rounded-full border-1 border-border py-1 px-2">
                            Beta
                        </span>
                    </span>
                </div>

                <SidebarSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            </header>

            <nav className="min-h-0 flex-1 overflow-y-auto">
                <NavRoutes searchQuery={searchQuery} />
            </nav>

            <footer className="shrink-0">
                <SidebarCtaCard />
            </footer>
        </aside>
    );
}

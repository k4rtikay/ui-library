"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import DocsHeader from "./docs-header";
import { Sidebar } from "./sidebar";
import Spotlight from "./spotlight";
import { paths } from "@/lib/paths";

interface DocsShellProps {
    children: ReactNode;
}

export function DocsShell({ children }: DocsShellProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <motion.div
            className="bg-sidebar grid h-dvh overflow-hidden md:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]"
            style={{ "--sidebar-width": "16rem" } as CSSProperties}
            initial={false}
            animate={{
                "--sidebar-width": isSidebarCollapsed ? "0rem" : "16rem",
            }}
            transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
                mass: 0.8,
            }}
            data-sidebar-collapsed={isSidebarCollapsed}
        >
            <motion.div
                className="hidden min-w-0 overflow-hidden md:block"
                initial={false}
                animate={{
                    opacity: isSidebarCollapsed ? 0 : 1,
                    x: isSidebarCollapsed ? -16 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 30,
                    mass: 0.8,
                }}
            >
                <Sidebar isCollapsed={isSidebarCollapsed} />
            </motion.div>
            <div className="relative m-3 min-h-0 min-w-0 overflow-hidden rounded-4xl bg-background">
                <DocsHeader
                    isSidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={() =>
                        setIsSidebarCollapsed((isCollapsed) => !isCollapsed)
                    }
                />
                <main
                    className="
                  mx-auto max-w-full md:max-w-3xl md:px-8 xl:pr-12 px-4 pt-26 pb-24
                  h-full min-w-0 overflow-y-auto overscroll-none scroll-pt-28 scrollbar-none
                  [mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%_-_4rem),transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_8rem,black_calc(100%_-_4rem),transparent_100%)]

                  prose prose-neutral dark:prose-invert text-pretty text-foreground leading-5.5

                  prose-h1:text-3xl prose-h1:font-semibold prose-h1:tracking-tight prose-h1:text-foreground prose-h1:scroll-m-20 prose-h1:mb-4
                  prose-h2:mt-12 prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:text-foreground
                  prose-h3:text-base prose-h3:font-semibold prose-h3:scroll-m-20
                  prose-strong:font-semibold prose-strong:text-foreground
                  prose-table:block prose-table:overflow-y-auto
                  prose-p:mt-2 prose-p:text-muted-foreground
                "
                >
                    {children}
                </main>
                <Spotlight routes={paths} />
            </div>
        </motion.div>
    );
}

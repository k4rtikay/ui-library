"use client";

import { Command } from "cmdk";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, FileText } from "lucide-react";

export type RouteItem = {
    title: string;
    href: string;
    category: string;
};

interface SpotlightProps {
    routes: RouteItem[];
}

export default function Spotlight({ routes }: SpotlightProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                setOpen(!open);
            }

            if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
            }
        };
        
        const handleOpenEvent = () => setOpen(true);
        
        document.addEventListener("keydown", down);
        document.addEventListener("open-cmdk", handleOpenEvent);

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.removeEventListener("keydown", down);
            document.body.style.overflow = "auto";
            document.removeEventListener("open-cmdk", handleOpenEvent);
        };
    }, [open]);

    const groupedRoutes = routes.reduce(
        (acc, route) => {
            if (!acc[route.category]) {
                acc[route.category] = [];
            } 
            acc[route.category].push(route);
            return acc;
        },
        {} as Record<string, RouteItem[]>,
    );

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
                    {/* Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            filter: "blur(4px)",
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.96,
                            filter: "blur(4px)",
                        }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.2,
                        }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
                    >
                        <Command
                            label="Global Command Menu"
                            className="flex h-full w-full flex-col"
                        >
                            {/* Search Input Area */}
                            <div
                                className="flex items-center border-b border-white/5 px-4"
                                cmdk-input-wrapper=""
                            >
                                <Search className="mr-3 h-5 w-5 text-zinc-500" />
                                <Command.Input
                                    autoFocus
                                    placeholder="Search components, interactions, and docs..."
                                    className="flex h-14 w-full rounded-md bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            {/* Search Results Area */}
                            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                                <Command.Empty className="py-6 text-center text-sm text-zinc-500">
                                    No results found.
                                </Command.Empty>

                                {Object.entries(groupedRoutes).map(
                                    ([category, items]) => (
                                        <Command.Group
                                            key={category}
                                            heading={category}
                                            className="p-1 text-xs font-medium text-zinc-500"
                                        >
                                            {items.map((route) => (
                                                <Command.Item
                                                    key={route.href}
                                                    value={route.title}
                                                    onSelect={() =>
                                                        runCommand(() =>
                                                            router.push(
                                                                route.href,
                                                            ),
                                                        )
                                                    }
                                                    className="group relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-zinc-300 outline-none data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                                                >
                                                    <FileText className="mr-2 h-4 w-4 text-zinc-500 group-data-[selected=true]:text-cyan-400" />
                                                    {route.title}
                                                </Command.Item>
                                            ))}
                                        </Command.Group>
                                    ),
                                )}
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

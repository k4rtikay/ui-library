"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export interface PinnedListItem {
    id: string;
    content: React.ReactNode;
    pinned: boolean;
}

interface PinnedListProps {
    items: PinnedListItem[];
    onTogglePin: (id: string) => void;
    className?: string;
}

export function PinnedList({ items, onTogglePin, className }: PinnedListProps) {

    const pinnedItems = items.filter((item) => item.pinned);
    const unpinnedItems = items.filter((item) => !item.pinned);

    return (
        <div className={cn("w-full max-w-md space-y-4", className)}>
            {pinnedItems.length > 0 && (
                <motion.section
                    layout
                >
                    <AnimatePresence initial={false}>
                        <motion.h3
                            key={"pinned"}
                            layout="position"
                            className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1">
                            Pinned
                        </motion.h3>
                    </AnimatePresence>
                    <ul className="space-y-2" role="list">
                        {pinnedItems.map((item) => (
                            <PinnedListRow
                                key={item.id}
                                item={item}
                                onTogglePin={onTogglePin}
                            />
                        ))}
                    </ul>
                </motion.section>
            )}

            {unpinnedItems.length > 0 && (
                <motion.section layout>
                    <AnimatePresence initial={false}>
                        <motion.h3
                            key={"all-items"}
                            layout="position"
                            className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1">
                            All Items
                        </motion.h3>
                    </AnimatePresence>
                    <ul className="space-y-2">
                        {unpinnedItems.map((item) => (
                            <PinnedListRow
                                key={item.id}
                                item={item}
                                onTogglePin={onTogglePin}
                            />
                        ))}
                    </ul>
                </motion.section>
            )}
        </div>
    );
}

function PinnedListRow({
    item,
    onTogglePin,
}: {
    item: PinnedListItem;
    onTogglePin: (id: string) => void;
}) {

    return (
        <motion.li
            layoutId={item.id}
            transition={{
                layout: { type: "spring", stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
            }}
            className={cn("relative group flex items-center bg-card border border-border/50 gap-3 rounded-lg px-3 py-2.5 hover:border-border/100 focus-within:border-border/100")}>
            <div className="min-w-0 flex items-center gap-3 flex-1">
                {item.content}
            </div>

            <button
                onClick={() => onTogglePin(item.id)}
                className={cn(
                    "shrink-0 p-1.5 rounded-full transition-colors outline-none",
                    item.pinned
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-muted-foreground/0 max-sm:text-muted-foreground group-hover:text-muted-foreground group-focus-within:text-muted-foreground",
                    item.pinned
                        ? "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-card"
                        : "focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1 focus-visible:ring-offset-card"
                )}
                aria-label={item.pinned ? "Unpin" : "Pin"}>
                <motion.div
                    layout="position"
                    initial={{ rotate: item.pinned ? 45 : 0, scale: 1 }}
                    animate={{
                        rotate: item.pinned ? 45 : 0,
                        scale: item.pinned ? 1.00 : 1,
                    }}
                    transition={{
                        layout: { type: "spring", stiffness: 280, damping: 25 },
                        rotate: { delay: item.pinned ? 0.18 : 0, duration: 0.15, ease: "easeInOut" },
                        scale: { delay: item.pinned ? 0.18 : 0, duration: 0.15, ease: "easeInOut" },
                    }}
                >
                    <PinIcon className="w-3.5 h-3.5" pinned={item.pinned} />
                </motion.div>
            </button>
        </motion.li>
    );
}

function PinIcon({ className, pinned }: { className?: string; pinned: boolean }) {
    return (
        <motion.div
            layout="position"
            initial={{
                backgroundColor: pinned ? "#3b82f6" : "rgba(0,0,0,0)",
                color: pinned ? "#ffffff" : "currentColor",
            }}
            animate={{
                backgroundColor: pinned ? "#3b82f6" : "rgba(0,0,0,0)",
                color: pinned ? "#ffffff" : "currentColor",
            }}
            transition={{
                layout: { type: "spring", stiffness: 280, damping: 25 },
                backgroundColor: { duration: 0.24, ease: "easeInOut" },
                color: { duration: 0.24, ease: "easeInOut" },
            }}
            className="p-2 rounded-full"
        >
            <Pin className={className} />
        </motion.div>
    );
}
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export interface PinnedListItem {
    id: string;
    content: React.ReactNode;
    pinned: boolean;
}

interface PinnedListProps {
    items: PinnedListItem[];
    onTogglePin: (id: string) => void;
    className?: string;
    pinnedLabel?: string;
    unpinnedLabel?: string;
}

export function PinnedList({
    items,
    onTogglePin,
    className,
    pinnedLabel = "Pinned",
    unpinnedLabel = "All Items",
}: PinnedListProps) {
    const pinnedItems = items.filter((item) => item.pinned);
    const unpinnedItems = items.filter((item) => !item.pinned);
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className={cn("w-full max-w-md space-y-4", className)}>
            {pinnedItems.length > 0 && (
                <motion.section layout={!shouldReduceMotion}>
                    <motion.h3
                        layout={!shouldReduceMotion ? "position" : false}
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1"
                    >
                        {pinnedLabel}
                    </motion.h3>
                    <ul className="space-y-2" role="list">
                        {pinnedItems.map((item) => (
                            <PinnedListRow
                                key={item.id}
                                item={item}
                                onTogglePin={onTogglePin}
                                shouldReduceMotion={shouldReduceMotion}
                            />
                        ))}
                    </ul>
                </motion.section>
            )}

            {unpinnedItems.length > 0 && (
                <motion.section layout={!shouldReduceMotion}>
                    <motion.h3
                        layout={!shouldReduceMotion ? "position" : false}
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1"
                    >
                        {unpinnedLabel}
                    </motion.h3>
                    <ul className="space-y-2" role="list">
                        {unpinnedItems.map((item) => (
                            <PinnedListRow
                                key={item.id}
                                item={item}
                                onTogglePin={onTogglePin}
                                shouldReduceMotion={shouldReduceMotion}
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
    shouldReduceMotion,
}: {
    item: PinnedListItem;
    onTogglePin: (id: string) => void;
    shouldReduceMotion: boolean | null;
}) {
    return (
        <motion.li
            layoutId={shouldReduceMotion ? undefined : item.id}
            transition={{
                layout: { type: "spring", stiffness: 300, damping: 25 },
                opacity: { duration: 0 },
            }}
            className={cn(
                "relative group flex items-center bg-card border border-border/50 gap-3 rounded-lg px-3 py-2.5 hover:border-border/100 focus-within:border-border/100",
            )}
        >
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
                        : "focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-1 focus-visible:ring-offset-card",
                )}
                aria-label={item.pinned ? "Unpin" : "Pin"}
            >
                <motion.div
                    initial={{ rotate: item.pinned ? 45 : 0 }}
                    animate={{ rotate: item.pinned ? 45 : 0 }}
                    transition={{
                        layout: { type: "spring", stiffness: 280, damping: 25 },
                        rotate: {
                            delay: item.pinned && !shouldReduceMotion ? 0.2 : 0,
                            duration: shouldReduceMotion ? 0 : 0.15,
                            ease: "easeInOut",
                        },
                    }}
                >
                    <PinIcon
                        className="w-4 h-4"
                        pinned={item.pinned}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                </motion.div>
            </button>
        </motion.li>
    );
}

function PinIcon({
    className,
    pinned,
    shouldReduceMotion,
}: {
    className?: string;
    pinned: boolean;
    shouldReduceMotion: boolean | null;
}) {
    return (
        <motion.div
            layout={!shouldReduceMotion ? "position" : false}
            initial={{
                backgroundColor: pinned ? "var(--primary)" : "rgba(0,0,0,0)",
                color: pinned ? "var(--primary-foreground)" : "currentColor",
            }}
            animate={{
                backgroundColor: pinned ? "var(--primary)" : "rgba(0,0,0,0)",
                color: pinned ? "var(--primary-foreground)" : "currentColor",
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
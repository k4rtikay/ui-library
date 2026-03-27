"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { motion } from "motion/react";

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
                <motion.section layout>
                    <motion.h3
                        layout="position"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeOut" }}
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1">
                        Pinned
                    </motion.h3>
                    <ul className="space-y-1">
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

            <motion.section layout>
                <motion.h3
                    layout="position"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    {pinnedItems.length > 0 ? "Everything else" : "All items"}
                </motion.h3>
                <ul className="space-y-1">
                    {unpinnedItems.map((item) => (
                        <PinnedListRow
                            key={item.id}
                            item={item}
                            onTogglePin={onTogglePin}
                        />
                    ))}
                </ul>
            </motion.section>
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
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="relative group flex items-center bg-card border border-border/50 gap-3 rounded-lg px-3 py-2.5 hover:border-border/100 transition-colors">
            <div className="min-w-0 flex items-center gap-3 flex-1">
                {item.content}
            </div>

            <button
                onClick={() => onTogglePin(item.id)}
                className={cn(
                    "shrink-0 p-1.5 rounded-md transition-colors",
                    item.pinned
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-muted-foreground/0 group-hover:text-muted-foreground"
                )}
                aria-label={item.pinned ? "Unpin" : "Pin"}>
                <motion.div
                    initial={{ rotate: item.pinned ? 45 : 0, scale: 1 }}
                    animate={{
                        rotate: item.pinned ? 45 : 0,
                        scale: item.pinned ? 1.05 : 1,
                    }}
                    transition={{ delay: item.pinned ? 0.15 : 0, duration: 0.15, ease: "easeInOut" }}
                >
                    <PinIcon className="w-3.5 h-3.5" pinned={item.pinned} />
                </motion.div>
            </button>
        </motion.li>
    );
}

function PinIcon({ className, pinned }: { className?: string; pinned: boolean }) {
    return pinned ?
        (<div className="p-2 bg-blue-500 text-white rounded-full">
            <Pin className={className} />
        </div>)
        :
        (<div className="p-2 bg-none group-hover:bg-muted rounded-full">
            <Pin className={className} />
        </div>);
}
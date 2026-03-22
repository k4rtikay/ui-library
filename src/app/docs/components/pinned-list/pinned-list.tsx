"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface PinnedListItem {
    id: string;
    label: string;
    description?: string;
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
        <div
            className={cn("w-full max-w-md space-y-4", className)}
        >
            {pinnedItems.length > 0 && (
                <motion.section layout>
                    <motion.h3 layout="position"
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
                <motion.h3 layout="position"
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
            transition={{ type: 'spring', stiffness: 240, damping: 25 }}
            layout="position"
            className="group flex items-center bg-card border border-2 border-border/50 gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors">
            <div className="min-w-0 flex flex-col flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                    {item.label}
                </p>
                {item.description && (
                    <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                    </p>
                )}
            </div>

            <button
                onClick={() => onTogglePin(item.id)}
                className={cn(
                    "shrink-0 p-1.5 rounded-md transition-colors",
                    item.pinned
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-foreground"
                )}
                aria-label={item.pinned ? "Unpin" : "Pin"}
            >
                <PinIcon className="w-3.5 h-3.5" pinned={item.pinned} />
            </button>
        </motion.li>
    );
}

function PinIcon({
    className,
    pinned,
}: {
    className?: string;
    pinned: boolean;
}) {
    if (pinned) {
        return (
            <PinOff className={className} />
        );
    }

    return (
        <Pin className={className} />
    );
}
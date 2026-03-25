"use client";

import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Pin, PinOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface PinnedListContextValue {
    onTogglePin: (id: string) => void;
    pinnedIds: Set<string>;
}

const PinnedListContext = createContext<PinnedListContextValue | null>(null);

function usePinnedList() {
    const ctx = useContext(PinnedListContext);
    if (!ctx) throw new Error("PinnedList.Item must be used within <PinnedList>");
    return ctx;
}

/* ------------------------------------------------------------------ */
/*  PinnedList (root)                                                 */
/* ------------------------------------------------------------------ */

interface PinnedListProps {
    children: React.ReactNode;
    pinnedIds: Set<string>;
    onTogglePin: (id: string) => void;
    className?: string;
}

export function PinnedList({ children, pinnedIds, onTogglePin, className }: PinnedListProps) {
    // Collect items by reading children props
    const items: { id: string; pinned: boolean; element: React.ReactElement }[] = [];

    React.Children.forEach(children, (child) => {
        if (
            React.isValidElement<PinnedListItemProps>(child) &&
            (child.type as any).displayName === "PinnedListItem"
        ) {
            const id = child.props.id;
            items.push({ id, pinned: pinnedIds.has(id), element: child });
        }
    });

    const pinned = items.filter((i) => i.pinned);
    const unpinned = items.filter((i) => !i.pinned);

    return (
        <PinnedListContext.Provider value={{ onTogglePin, pinnedIds }}>
            <div className={cn("w-full max-w-md space-y-4", className)}>
                {pinned.length > 0 && (
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
                            {pinned.map((i) => i.element)}
                        </ul>
                    </motion.section>
                )}

                <motion.section layout>
                    <motion.h3
                        layout="position"
                        className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 px-1">
                        {pinned.length > 0 ? "Everything else" : "All items"}
                    </motion.h3>
                    <ul className="space-y-1">
                        {unpinned.map((i) => i.element)}
                    </ul>
                </motion.section>
            </div>
        </PinnedListContext.Provider>
    );
}

/* ------------------------------------------------------------------ */
/*  PinnedList.Item                                                   */
/* ------------------------------------------------------------------ */

interface PinnedListItemProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

function PinnedListItem({ id, children, className }: PinnedListItemProps) {
    const { onTogglePin, pinnedIds } = usePinnedList();
    const pinned = pinnedIds.has(id);

    return (
        <motion.li
            layoutId={id}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className={cn(
                "relative group flex items-center bg-card border-1 border-border/50 gap-3 rounded-lg px-3 py-2.5 hover:border-border/100 transition-colors",
                className
            )}>
            <div className="min-w-0 flex items-center gap-3 flex-1">
                {children}
            </div>

            <button
                onClick={() => onTogglePin(id)}
                className={cn(
                    "shrink-0 p-1.5 rounded-md transition-colors",
                    pinned
                        ? "text-foreground hover:text-muted-foreground"
                        : "text-muted-foreground/0 group-hover:text-muted-foreground"
                )}
                aria-label={pinned ? "Unpin" : "Pin"}>
                <motion.div
                    // initial={{ rotate: pinned ? 45 : 0, scale: 1 }}
                    animate={{
                        rotate: pinned ? 45 : 0,
                        scale: pinned ? 1.05 : 1,
                    }}
                    transition={{ delay: pinned ? 0.15 : 0, duration: 0.15, ease: "easeInOut" }}
                >
                    <PinIcon className="w-3.5 h-3.5" pinned={pinned} />
                </motion.div>
            </button>
        </motion.li>
    );
}

PinnedListItem.displayName = "PinnedListItem";
PinnedList.Item = PinnedListItem;

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

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
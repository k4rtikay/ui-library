"use client"

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type ViewType = "list" | "card" | "compact";

interface SharedMenuContextType {
    index: number;
    viewType: ViewType;
}

const SharedMenuContext = createContext<SharedMenuContextType | null>(null);

function useSharedMenuContext() {
    const context = useContext(SharedMenuContext);
    if (!context) {
        throw new Error("SharedMenu sub-components must be used within a SharedMenuItem");
    }
    return context;
}

export interface SharedMenuProps<T> extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    items: T[];
    children: (item: T, index: number, viewType: ViewType) => React.ReactNode;
    initialView?: ViewType;
    onViewChange?: (view: ViewType) => void;
}

export const SharedMenu = React.forwardRef<HTMLElement, SharedMenuProps<any>>(
    (
        {
            items,
            children,
            initialView = "list",
            onViewChange,
            className,
            ...props
        },
        ref
    ) => {
        const [viewType, setViewType] = useState<ViewType>(initialView);

        const handleViewChange = (view: ViewType) => {
            setViewType(view);
            onViewChange?.(view);
        };

        const renderItems = () => {
            switch (viewType) {
                case "list":
                    return <ListView items={items} renderItem={children} />;
                case "card":
                    return <CardView items={items} renderItem={children} />;
                case "compact":
                    return <CompactView items={items} renderItem={children} />;
            }
        };

        return (
            <section
                ref={ref}
                className={cn("flex flex-col gap-4", className)}
                {...props}
            >
                <div className="flex gap-4 h-fit">
                    <ViewButton
                        title="List View"
                        isActive={viewType === "list"}
                        onClick={() => handleViewChange("list")}
                    />
                    <ViewButton
                        title="Card View"
                        isActive={viewType === "card"}
                        onClick={() => handleViewChange("card")}
                    />
                    <ViewButton
                        title="Compact View"
                        isActive={viewType === "compact"}
                        onClick={() => handleViewChange("compact")}
                    />
                </div>

                <div className="bg-[#2C2C2C] w-full h-px shrink-0" />

                <motion.div
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                        layout: { duration: 0.3 }
                    }}
                    className="min-h-[240px] relative overflow-hidden w-full"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={viewType}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderItems()}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </section>
        );
    }
);

SharedMenu.displayName = "SharedMenu";

export function SharedMenuItem({
    index,
    viewType,
    children,
    className,
    ...props
}: {
    index: number;
    viewType: ViewType;
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof motion.div>) {
    return (
        <SharedMenuContext.Provider value={{ index, viewType }}>
            <motion.div
                layoutId={`item-${index}`}
                className={className}
                {...props}
            >
                {children}
            </motion.div>
        </SharedMenuContext.Provider>
    );
}

export function SharedMenuImage({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.div>) {
    const context = useSharedMenuContext();
    return (
        <motion.div layoutId={`image-${context.index}`} className={className} {...props}>
            {children}
        </motion.div>
    );
}

export function SharedMenuContent({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.div>) {
    const context = useSharedMenuContext();
    return (
        <motion.div layoutId={`content-${context.index}`} className={className} {...props}>
            {children}
        </motion.div>
    );
}

export function SharedMenuNumber({
    className,
    children,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.span>) {
    const context = useSharedMenuContext();
    return (
        <motion.span layoutId={`number-${context.index}`} className={className} {...props}>
            {children}
        </motion.span>
    );
}


interface LayoutProps {
    items: any[];
    renderItem: (item: any, index: number, viewType: ViewType) => React.ReactNode;
}

function ListView({ items, renderItem }: LayoutProps) {
    return (
        <div className="space-y-3">
            {items.map((item, index) => renderItem(item, index, "list"))}
        </div>
    );
}

function CardView({ items, renderItem }: LayoutProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => renderItem(item, index, "card"))}
        </div>
    );
}

function CompactView({ items, renderItem }: LayoutProps) {
    return (
        <div className="space-y-4 pt-4">
            <div className="mx-auto relative w-40 h-40">
                {items.map((item, index) => renderItem(item, index, "compact"))}
            </div>
            <span className="mx-auto w-fit text-sm text-neutral-600 dark:text-neutral-400 block pb-4">
                {items.length} items
            </span>
        </div>
    );
}


function ViewButton({ title, isActive, onClick }: { title: string; isActive: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-2 rounded-[50px] [corner-shape:squircle] font-medium text-sm transition-all",
                isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            )}
        >
            {title}
        </button>
    );
}
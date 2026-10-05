"use client";

import * as React from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "motion/react";
import { Indie_Flower } from "next/font/google";

import { cn } from "@/lib/utils";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type Direction = "left" | "right";

const indieFlower = Indie_Flower({
    subsets: ["latin"],
    weight: ["400"],
});

const squiggle =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath d='M0 3 Q3 0 6 3 T12 3' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")";

const SHOWN = "inset(0 0 0 0)";
const COLLAPSED_LEFT = "inset(0 100% 0 0)";
const COLLAPSED_RIGHT = "inset(0 0 0 100%)";

const DURATION = 0.26;

const squiggleVariants = {
    enter: (dir: Direction) => ({
        clipPath: dir === "right" ? COLLAPSED_LEFT : COLLAPSED_RIGHT,
    }),
    center: {
        clipPath: SHOWN,
        transition: {
            duration: DURATION,
            ease: "easeInOut",
            delay: DURATION * 0.6,
        },
    },
    exit: (dir: Direction) => ({
        clipPath: dir === "right" ? COLLAPSED_RIGHT : COLLAPSED_LEFT,
        transition: { duration: DURATION, ease: "easeInOut" },
    }),
};

interface SquiggleTabsContextValue {
    activeTab: string;
    direction: Direction;
}

const SquiggleTabsContext =
    React.createContext<SquiggleTabsContextValue | null>(null);

function useSquiggleTabs() {
    const context = React.useContext(SquiggleTabsContext);
    if (!context) {
        throw new Error("Squiggle tabs parts must be used within <SquiggleTabs>");
    }
    return context;
}

type SquiggleTabsProps = React.ComponentProps<typeof Tabs>;

function SquiggleTabs({
    value: valueProp,
    defaultValue = "",
    onValueChange,
    ref,
    ...props
}: SquiggleTabsProps) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [direction, setDirection] = React.useState<Direction>("right");

    const isControlled = valueProp !== undefined;
    const activeTab = isControlled ? valueProp : internalValue;

    const setRefs = React.useCallback(
        (node: HTMLDivElement | null) => {
            rootRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        },
        [ref],
    );

    const handleValueChange = (next: string) => {
        // Derive tab order from the DOM so triggers can be composed freely.
        const triggers = Array.from(
            rootRef.current?.querySelectorAll<HTMLElement>(
                '[data-slot="tabs-trigger"]',
            ) ?? [],
        );
        const values = triggers.map((el) => el.dataset.value);
        const prevIndex = values.indexOf(activeTab);
        const nextIndex = values.indexOf(next);

        if (prevIndex !== -1 && nextIndex !== -1) {
            setDirection(nextIndex < prevIndex ? "left" : "right");
        }

        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
    };

    const context = React.useMemo(
        () => ({ activeTab, direction }),
        [activeTab, direction],
    );

    return (
        <SquiggleTabsContext.Provider value={context}>
            <Tabs
                ref={setRefs}
                value={activeTab}
                onValueChange={handleValueChange}
                {...props}
            />
        </SquiggleTabsContext.Provider>
    );
}

function SquiggleTabsTrigger({
    value,
    children,
    className,
    ...props
}: React.ComponentProps<typeof TabsTrigger>) {
    const { activeTab, direction } = useSquiggleTabs();
    const isActive = activeTab === value;

    return (
        <TabsTrigger
            value={value}
            data-value={value}
            className={cn(
                "group relative text-base font-semibold after:hidden data-[state=active]:after:hidden",
                indieFlower.className,
                className,
            )}
            {...props}
        >
            {children}

            <AnimatePresence initial={false} custom={direction}>
                {isActive && (
                    <motion.span
                        key="squiggle"
                        custom={direction}
                        variants={squiggleVariants as Variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-[6px] bg-red-500"
                        style={{
                            maskImage: squiggle,
                            WebkitMaskImage: squiggle,
                            maskRepeat: "repeat-x",
                            WebkitMaskRepeat: "repeat-x",
                        }}
                    />
                )}
            </AnimatePresence>
        </TabsTrigger>
    );
}

function SquiggleTabsList({
    variant = "line",
    ...props
}: React.ComponentProps<typeof TabsList>) {
    return <TabsList variant={variant} {...props} />;
}

function SquiggleTabsContent({
    children,
    ...props
}: React.ComponentProps<typeof TabsContent>) {
    const { direction } = useSquiggleTabs();
    const reduceMotion = useReducedMotion();

    return (
        <TabsContent {...props}>
            <motion.div
                initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : direction === "right" ? 24 : -24,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </TabsContent>
    );
}

export {
    SquiggleTabs,
    SquiggleTabsList,
    SquiggleTabsTrigger,
    SquiggleTabsContent,
    useSquiggleTabs,
};

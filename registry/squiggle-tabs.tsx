"use client";

import * as React from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "motion/react";

import { cn } from "@/lib/utils";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

type Direction = "left" | "right";

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

const DEFAULT_SQUIGGLE_COLOR = "#ef4444";

interface SquiggleTabsContextValue {
    activeTab: string;
    direction: Direction;
    squiggleColor: string;
    /** Scopes trigger lookups to this root so nested tabs don't interfere. */
    rootId: string;
    /** False until the active tab has changed at least once. */
    hasNavigated: boolean;
}

const SquiggleTabsContext =
    React.createContext<SquiggleTabsContextValue | null>(null);

function useSquiggleTabsContext() {
    const context = React.useContext(SquiggleTabsContext);
    if (!context) {
        throw new Error("Squiggle tabs parts must be used within <SquiggleTabs>");
    }
    return context;
}

/** Reads the active tab and the direction of the last change. */
function useSquiggleTabs() {
    const { activeTab, direction, squiggleColor } = useSquiggleTabsContext();
    return { activeTab, direction, squiggleColor };
}

interface SquiggleTabsProps extends Omit<
    React.ComponentProps<typeof Tabs>,
    "orientation"
> {
    /** Default squiggle color for every trigger. Any CSS color. */
    squiggleColor?: string;
}

function SquiggleTabs({
    value: valueProp,
    defaultValue = "",
    onValueChange,
    squiggleColor = DEFAULT_SQUIGGLE_COLOR,
    ref,
    ...props
}: SquiggleTabsProps) {
    const rootId = React.useId();
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [direction, setDirection] = React.useState<Direction>("right");

    const isControlled = valueProp !== undefined;
    const activeTab = isControlled ? valueProp : internalValue;

    // Adjust state during render so panels mounting for the new tab already
    // see `hasNavigated`, whether the change came from a click or from props.
    const [previousTab, setPreviousTab] = React.useState(activeTab);
    const [hasNavigated, setHasNavigated] = React.useState(false);
    if (previousTab !== activeTab) {
        setPreviousTab(activeTab);
        setHasNavigated(true);
    }

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
        // Only our own attributes are used, so this doesn't depend on the
        // markup of the installed shadcn `tabs` component.
        const values = Array.from(
            rootRef.current?.querySelectorAll<HTMLElement>(
                "[data-squiggle-value]",
            ) ?? [],
        )
            .filter((el) => el.dataset.squiggleRoot === rootId)
            .map((el) => el.dataset.squiggleValue);
        const prevIndex = values.indexOf(activeTab);
        const nextIndex = values.indexOf(next);

        if (prevIndex !== -1 && nextIndex !== -1) {
            setDirection(nextIndex < prevIndex ? "left" : "right");
        }

        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
    };

    const context = React.useMemo(
        () => ({ activeTab, direction, squiggleColor, rootId, hasNavigated }),
        [activeTab, direction, squiggleColor, rootId, hasNavigated],
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

interface SquiggleTabsTriggerProps extends React.ComponentProps<
    typeof TabsTrigger
> {
    /** Overrides the squiggle color set on `SquiggleTabs` for this trigger. */
    squiggleColor?: string;
}

function SquiggleTabsTrigger({
    value,
    children,
    className,
    squiggleColor: squiggleColorProp,
    ...props
}: SquiggleTabsTriggerProps) {
    const { activeTab, direction, squiggleColor, rootId } =
        useSquiggleTabsContext();
    const isActive = activeTab === value;
    const color = squiggleColorProp ?? squiggleColor;

    return (
        <TabsTrigger
            value={value}
            className={cn("relative after:hidden", className)}
            {...props}
            data-squiggle-value={value}
            data-squiggle-root={rootId}
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
                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-1.5"
                        style={{
                            backgroundColor: color,
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
    className,
    ...props
}: React.ComponentProps<typeof TabsContent>) {
    const { direction, hasNavigated } = useSquiggleTabsContext();
    const reduceMotion = useReducedMotion();

    return (
        // The slide would otherwise overflow the panel horizontally. `clip`
        // (unlike `hidden`) leaves the vertical axis alone, so focus rings
        // aren't cut off at the top and bottom.
        <TabsContent {...props} className="overflow-x-clip">
            <motion.div
                className={className}
                initial={
                    hasNavigated
                        ? {
                              opacity: 0,
                              x: reduceMotion
                                  ? 0
                                  : direction === "right"
                                    ? 24
                                    : -24,
                          }
                        : false
                }
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

"use client";

import { cn } from "@/lib/utils";
import React, {
    Children,
    isValidElement,
    useMemo,
    ElementType,
} from "react";
import { motion, Transition, useReducedMotion } from "motion/react";

type Direction = "up" | "down" | "left" | "right";
type StaggerFrom = "first" | "last" | "center";

// Omit props that conflict with Motion's event handlers
type SafeHTMLProps = Omit<
    React.HTMLAttributes<HTMLElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

interface StaggerRevealProps extends SafeHTMLProps {
    children: React.ReactNode;
    className?: string;

    // Variant
    variant?: "items" | "text";
    by?: "character" | "word";

    // Animation
    direction?: Direction;
    staggerDelay?: number;
    staggerFrom?: StaggerFrom;
    transition?: Transition;

    // Control
    trigger?: boolean;

    // Customization
    as?: ElementType;
}

const DEFAULT_TRANSITION: Transition = {
    type: "spring",
    damping: 20,
    stiffness: 200,
};

const getDirectionOffset = (direction: Direction) => {
    switch (direction) {
        case "up":
            return { y: 20 };
        case "down":
            return { y: -20 };
        case "left":
            return { x: 20 };
        case "right":
            return { x: -20 };
    }
};

const getStaggerConfig = (staggerFrom: StaggerFrom, staggerDelay: number) => {
    switch (staggerFrom) {
        case "first":
            return { delayChildren: staggerDelay };
        case "last":
            return { delayChildren: staggerDelay, staggerDirection: -1 };
        case "center":
            return { delayChildren: staggerDelay };
    }
};

export function StaggerReveal({
    children,
    className,
    variant = "items",
    by = "character",
    direction = "up",
    staggerDelay = 0.05,
    staggerFrom = "first",
    transition = DEFAULT_TRANSITION,
    trigger = true,
    as: Component = "div",
    ...props
}: StaggerRevealProps) {
    const prefersReducedMotion = useReducedMotion();
    const directionOffset = getDirectionOffset(direction);

    const containerVariants = useMemo(
        () => ({
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: staggerDelay,
                    ...getStaggerConfig(staggerFrom, staggerDelay),
                },
            },
        }),
        [staggerDelay, staggerFrom]
    );

    const itemVariants = useMemo(
        () => ({
            hidden: prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    ...directionOffset,
                },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition,
            },
        }),
        [prefersReducedMotion, directionOffset, transition]
    );

    // Text variant - split into characters or words
    if (variant === "text") {
        const text = typeof children === "string" ? children : "";
        const elements =
            by === "character"
                ? text.split("")
                : text.split(" ").map((word, i, arr) =>
                    i < arr.length - 1 ? word + " " : word
                );

        return (
            <motion.span
                className={cn("inline-flex flex-wrap", className)}
                variants={containerVariants}
                initial="hidden"
                animate={trigger ? "visible" : "hidden"}
                aria-label={text}
                {...props}
            >
                {elements.map((char, index) => (
                    <motion.span
                        key={index}
                        variants={itemVariants}
                        className="inline-block"
                        aria-hidden="true"
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.span>
        );
    }

    // Items variant - animate children
    const items = Children.toArray(children).filter(isValidElement);

    const MotionComponent = motion.create(Component);

    return (
        <MotionComponent
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={trigger ? "visible" : "hidden"}
            {...props}
        >
            {items.map((child, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex"
                >
                    {child}
                </motion.div>
            ))}
        </MotionComponent>
    );
}

// Sub-component for custom item control
type SafeDivProps = Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

interface StaggerRevealItemProps extends SafeDivProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerRevealItem({
    children,
    className,
    ...props
}: StaggerRevealItemProps) {
    return (
        <motion.div
            className={cn(className)}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

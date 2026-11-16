"use client";

import React from "react";
import {
    motion,
    AnimatePresence,
    HTMLMotionProps,
    useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    CancelCircleIcon,
    CheckmarkCircle01Icon,
    Loading02Icon,
} from "@hugeicons/core-free-icons";

export type ButtonState = "idle" | "loading" | "success" | "error";

interface LoaderButtonProps extends HTMLMotionProps<"button"> {
    state: ButtonState;
    children?: React.ReactNode;
    successLabel?: React.ReactNode;
    errorLabel?: React.ReactNode;
    loader?: React.ReactNode;
}

export const LoaderButton = React.forwardRef<
    HTMLButtonElement,
    LoaderButtonProps
>(
    (
        {
            state,
            children = "Submit",
            successLabel,
            errorLabel,
            loader,
            className,
            disabled,
            onClick,
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled || state !== "idle";

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (isDisabled) {
                event.preventDefault();
                return;
            }
            onClick?.(event);
        };

        const defaultSuccessLabel = (
            <span className="flex justify-center items-center gap-1">
                <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-4 h-4" /> Success
            </span>
        );

        const defaultErrorLabel = (
            <span className="flex justify-center items-center gap-1">
                <HugeiconsIcon icon={CancelCircleIcon} className="w-4 h-4" /> Error
            </span>
        );

        const shouldReduceMotion = useReducedMotion();

        return (
            <motion.button
                ref={ref}
                variants={buttonVariants}
                animate={state}
                layout
                transition={layoutTransition}
                aria-disabled={isDisabled}
                onClick={handleClick}
                custom={shouldReduceMotion}
                className={cn(
                    "relative flex items-center justify-center h-12 py-2 px-4 rounded-full font-semibold",
                    "transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isDisabled && "cursor-not-allowed",

                    (state === "idle" || state === "loading") &&
                        "bg-primary text-primary-foreground",
                    state === "idle" && !isDisabled && "hover:brightness-95",
                    className,

                    state === "success" &&
                        "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-50",
                    state === "error" &&
                        "bg-destructive/25 text-destructive dark:bg-destructive dark:text-white",
                )}
                aria-busy={state === "loading"}
                {...props}
            >
                <span className="sr-only" aria-live="polite">
                    {state === "loading" && "Loading"}
                    {state === "success" && "Success"}
                    {state === "error" && "Error"}
                </span>

                <AnimatePresence mode="popLayout">
                    {state === "idle" && (
                        <motion.div
                            key="idle"
                            layout="position"
                            transition={layoutTransition}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {children}
                        </motion.div>
                    )}
                    {state === "loading" && (
                        <motion.div
                            key="loading"
                            layout="position"
                            transition={layoutTransition}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            aria-hidden="true"
                            className="flex items-center justify-center gap-2"
                        >
                            {loader ?? (
                                <span className="flex items-center justify-center gap-1 opacity-90">
                                    <HugeiconsIcon icon={Loading02Icon} className="w-4 h-4 animate-spin" />
                                    Processing
                                </span>
                            )}
                        </motion.div>
                    )}
                    {state === "success" && (
                        <motion.div
                            key="success"
                            layout="position"
                            transition={layoutTransition}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            aria-hidden="true"
                        >
                            {successLabel ?? defaultSuccessLabel}
                        </motion.div>
                    )}
                    {state === "error" && (
                        <motion.div
                            key="error"
                            layout="position"
                            transition={layoutTransition}
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            aria-hidden="true"
                        >
                            {errorLabel ?? defaultErrorLabel}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        );
    },
);

LoaderButton.displayName = "LoaderButton";

// --- Animation Variants ---

const buttonVariants = {
    idle: {
        scale: 1,
    },

    success: (shouldReduceMotion: boolean) => {
        return {
            scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
            transition: {
                scale: {
                    duration: 0.3,
                    ease: "easeInOut",
                },
            } as const,
        };
    },
    error: (shouldReduceMotion: boolean) => {
        return {
            scale: 1,
            x: shouldReduceMotion ? 0 : [0, -6, 5, -3, 2, 0],
            transition: {
                x: {
                    duration: 0.3,
                    ease: "easeOut",
                },
            } as const,
        };
    },
};

const layoutTransition = {
    layout: {
        duration: 0.2,
        ease: "easeInOut",
    },
} as const;

const contentVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: 0.05,
            ease: "easeOut",
        } as const,
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.1,
            ease: "easeOut",
        } as const,
    },
};

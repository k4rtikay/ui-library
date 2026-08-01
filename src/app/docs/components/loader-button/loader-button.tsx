"use client";

import React from "react";
import {
    motion,
    AnimatePresence,
    HTMLMotionProps,
    useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

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
            ...props
        },
        ref,
    ) => {
        const isDisabled = disabled ?? state !== "idle";

        const defaultSuccessLabel = (
            <span className="flex justify-center items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Success
            </span>
        );

        const defaultErrorLabel = (
            <span className="flex justify-center items-center gap-1">
                <XCircle className="w-4 h-4" /> Error
            </span>
        );

        const shouldReduceMotion = useReducedMotion();

        return (
            <motion.button
                ref={ref}
                variants={buttonVariants}
                animate={state}
                custom={shouldReduceMotion}
                className={cn(
                    // Base styles
                    "relative flex items-center justify-center min-w-[120px] h-12 py-2 px-4 rounded-full font-semibold",
                    "transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isDisabled && "pointer-events-none cursor-not-allowed",

                    // Theme-aware state colors
                    state === "idle" &&
                        "bg-primary text-primary-foreground hover:brightness-95",
                    state === "loading" && "bg-primary text-primary-foreground",
                    state === "success" &&
                        "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-50",
                    state === "error" &&
                        "bg-destructive/25 dark:bg-destructive text-destructive-foreground dark:text-white",
                    className,
                )}
                aria-busy={state === "loading"}
                aria-live="polite"
                {...props}
            >
                <span className="sr-only" aria-live="polite">
                    {state === "loading" && "Loading"}
                    {state === "success" && "Success"}
                    {state === "error" && "Error"}
                </span>

                <AnimatePresence mode="wait">
                    {state === "idle" && (
                        <motion.div
                            key="idle"
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
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            aria-hidden="true"
                            className="w-full flex items-center justify-center gap-2"
                        >
                            {loader ?? (
                                <span className="w-full h-full flex items-center justify-center gap-1 text-xs opacity-90"><Loader2 className="w-5 h-5 animate-spin" />Processing</span>
                            )}
                        </motion.div>
                    )}
                    {state === "success" && (
                        <motion.div
                            key="success"
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
    loading: {
        scale: 1,
        transition: {
            scale: {
                repeat: Infinity,
                duration: 1.25,
                ease: "easeInOut",
            },
        } as const,
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

const contentVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.1,
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

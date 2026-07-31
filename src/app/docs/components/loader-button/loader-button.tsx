"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

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

        return (
            <motion.button
                ref={ref}
                variants={buttonVariants}
                animate={state}
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
                        "bg-destructive text-destructive-foreground",
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
                            {loader ?? <LoadingSpinner />}
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
    success: {
        scale: [1, 1.05, 1],
        transition: {
            scale: {
                duration: 0.3,
                ease: "easeInOut",
            },
        } as const,
    },
    error: {
        scale: 1,
        x: [0, -6, 5, -3, 2, 0],
        transition: {
            x: {
                duration: 0.3,
                ease: "easeOut",
            },
        } as const,
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

// --- Loading Spinner ---

export function LoadingSpinner() {
    return (
        <div className="flex w-fit p-2 rounded-full h-full items-center justify-center">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    variants={loaderVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={i}
                    className="w-1 h-4 rounded-full mx-0.5 bg-primary-foreground"
                />
            ))}
        </div>
    );
}

const loaderVariants = {
    initial: {
        opacity: 0,
    },
    animate: (i: number) => ({
        opacity: 1,
        scale: [0.5, 1, 0.5],
        transition: {
            scale: {
                repeat: Infinity,
                duration: 0.75,
                ease: [0.45, 0, 0.55, 1],
                delay: i * 0.1,
            },
        } as const,
    }),
    exit: {
        opacity: 0,
    },
};

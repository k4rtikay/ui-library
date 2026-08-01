"use client";

import { useEffect, useState } from "react";
import { LoaderButton, type ButtonState } from "./loader-button";
import { motion } from "motion/react";


export default function LoaderButtonDemo() {
    const [buttonState, setButtonState] = useState<ButtonState>("idle");
    const [simulateError, setSimulateError] = useState(false);

    const simulateHandleClick = (delay: number = 1500) => {
        setButtonState("loading");
        setTimeout(() => {
            if (simulateError) {
                setButtonState("error");
            } else {
                setButtonState("success");
            }
        }, delay);
    };

    useEffect(() => {
        if (buttonState === "error" || buttonState === "success") {
            const timer = setTimeout(() => {
                setButtonState("idle");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    return (
        <div className="flex flex-col min-h-[15rem] w-full items-center justify-center gap-8">
            <LoaderButton
                state={buttonState}
                onClick={() => simulateHandleClick(1500)}
            >
                Submit
            </LoaderButton>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                    type="checkbox"
                    id="error-toggle"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                />
                <label htmlFor="error-toggle" className="cursor-pointer select-none">
                    Simulate Error State
                </label>
            </div>
        </div>
    );
}

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
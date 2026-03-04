"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface LoaderButtonProps {
    state?: ButtonState;
    onClick?: () => void;
}

export default function LoaderButton({ state = 'idle', onClick }: LoaderButtonProps) {

    const [buttonState, setButtonState] = useState<ButtonState>(state);

    const simulateHandleClick = (delay: number = 1500, shouldFail: boolean = false) => {
        setButtonState('loading');
        setTimeout(() => {
            if (shouldFail) {
                setButtonState('error');
            } else {
                setButtonState('success');
            }
        }, delay);
    };

    useEffect(() => {
        if (buttonState == 'error' || buttonState == 'success') {
            const timer = setTimeout(() => {
                setButtonState('idle');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    return (
        <motion.button
            onClick={() => simulateHandleClick(3000, false)}
            disabled={buttonState !== 'idle'}
            variants={buttonVariants}
            animate={buttonState}
            className={cn(`min-w-[120px] h-12 py-2 px-4 rounded-full font-semibold hover:brightness-95 transition-colors duration-30`,
                buttonState != 'idle' && 'cursor-not-allowed',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2')}
            style={{
                backgroundColor:
                    buttonState === 'success' ? '#a0e2b3ff' :
                        buttonState === 'error' ? '#efb2adff' :
                            'var(--primary)',
                color:
                    buttonState === 'success' ? '#1f3024ff' :
                        buttonState === 'error' ? '#4a1b1bff' :
                            'var(--primary-foreground)',
            }}
        >
            <AnimatePresence
                mode="wait"
            >
                {buttonState === 'idle' &&
                    <motion.div
                        key={'idle'}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        Submit
                    </motion.div>
                }
                {buttonState === 'loading' &&
                    <motion.div
                        key={'loading'}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <LoadingSpinner />
                    </motion.div>
                }
                {buttonState === 'success' &&
                    <motion.div
                        key={'success'}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex justify-center items-center gap-1"
                    >
                        <CheckCircle2 className="w-4 h-4" /> Success
                    </motion.div>
                }
                {buttonState === 'error' &&
                    <motion.div
                        key={'error'}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex justify-center items-center gap-1"
                    >
                        <XCircle className="w-4 h-4" /> Error
                    </motion.div>
                }
            </AnimatePresence>
        </motion.button>
    );
}

const buttonVariants = {
    idle: {
        scale: 1,
    },
    loading: {
        scale: [1, 1.02, 1],
        transition: {
            scale: {
                repeat: Infinity,
                duration: 1.25,
                ease: "easeInOut",
            }
        } as const,
    },
    success: {
        scale: [1, 1.1, 1],
        transition: {
            scale: {
                duration: 0.3,
                ease: "easeInOut",
            }
        } as const,
    },
    error: {
        scale: 1,
        x: [0, -6, 5, -3, 2, 0],
        transition: {
            x: {
                duration: 0.3,
                ease: "easeOut",
            }
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
}

export function LoadingSpinner() {
    return (
        <div className="flex w-fit p-2 rounded-full h-full items-center justify-center">
            {[...Array(4)].map((_, i) => {
                return (
                    <motion.div
                        key={i}
                        variants={loaderVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={i}
                        className="w-1 h-4 rounded-full mx-0.5 bg-primary-foreground"
                    />
                );
            })}
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
            }
        } as const,
    }),
    exit: {
        opacity: 0,
    },
}
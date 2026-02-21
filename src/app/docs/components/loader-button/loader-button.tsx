"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface LoaderButtonProps {
    state?: ButtonState;
    onClick?: () => void;
}

export default function LoaderButton({ state = 'idle', onClick }: LoaderButtonProps) {

    const [buttonState, setButtonState] = useState<ButtonState>(state);

    const simulateHandleClick = ( delay:number = 1500, shouldFail:boolean = false ) => {
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
        if(buttonState == 'error' || buttonState=='success'){
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
            layout
            variants={buttonVariants}
            animate={buttonState}
            className="w-48 h-12 rounded-full font-semibold"
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
                        Loader Button
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
                        <LoadingSpinner /> Submitting...
                    </motion.div>
                }
                {buttonState === 'success' &&
                    <motion.div
                    key={'success'}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    >
                        Success
                    </motion.div>
                }
                {buttonState === 'error' &&
                    <motion.div
                    key={'error'}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    >
                        Error
                    </motion.div>
                }
            </AnimatePresence>
        </motion.button>
    );
}

const buttonVariants = {
    idle: {
        scale: 1,
        backgroundColor: 'var(--muted)',
        color: 'var(--foreground)',
    },
    loading: {
        scale: [1,1.02,1],
        color: 'var(--foreground)',
        transition: {
            scale: {
                repeat: Infinity,
                duration: 1.25,
                ease: "easeInOut",
            }
        } as const,
        backgroundColor: 'var(--muted)',
    },
    success: {
        scale: [1,1.15,1],
        backgroundColor: '#a0e2b3ff',
        color: '#1f3024ff',
        transition: {
            scale: {
                duration: 0.25,
                ease: "easeInOut",
            }
        } as const,
    },
    error: {
        scale: 1,
        x: [0, -4, 4, -4, 4, 0],
        transition: {
            x: {
                duration: 0.25,
            }
        } as const,
        backgroundColor: '#efb2adff',
        color: '#4a1b1bff',
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

export function LoadingSpinner(){
    return (
        <div className="flex w-fit p-2 rounded-full h-full items-center justify-center bg-foreground">
            {[...Array(4)].map((_,i) => {
                return (
                    <motion.div
                    key={i}
                    variants={loaderVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={i}
                    className="w-1 h-4 rounded-full mx-0.5 bg-background"
                    />
                );
            })}
        </div>
    );
}

const loaderVariants = {
    initial: {
        opacity: 0,
        x: -10,
    },
    animate: (i:number) => ({
        opacity: 1,
        x: 0,
        scaleY: [0.5, 1, 0.5],
        transition: {
            scaleY: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
                delay: i * 0.1,
            }
        } as const,
    }),
    exit: {
        opacity: 0,
    },
}
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
            onClick={() => simulateHandleClick(2000, false)}
            disabled={buttonState !== 'idle'}
            layout
            variants={buttonVariants}
            animate={buttonState}
            className="w-64 text-background px-4 py-2 rounded-full"
        >
            <AnimatePresence
            mode="wait"
            >
                {buttonState === 'idle' &&
                    <motion.span
                    key={'idle'}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    >
                        Loader Button
                    </motion.span>
                }
                {buttonState === 'loading' &&
                    <motion.div
                    key={'loading'}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    >
                        Loading...
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
        backgroundColor: 'var(--foreground)',
    },
    loading: {
        scale: [1,1.05,1],
        transition: {
            scale: {
                repeat: Infinity,
                duration: 1,
                ease: "easeInOut",
            }
        } as const,
        backgroundColor: 'var(--foreground)',
    },
    success: {
        scale: [1,1.15,1],
        backgroundColor: '#98D8AA',
        transition: {
            scale: {
                duration: 0.25,
                ease: "easeOut",
            }
        } as const,
    },
    error: {
        scale: 1,
        x: [0, -4, 4, -4, 4, 0],
        transition: {
            x: {
                duration: 0.4,
            }
        } as const,
        backgroundColor: '#F07167',
    },
};

const contentVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -10,
    },
}
"use client";

import { cn } from "@/lib/utils";
import React, { Children, useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

interface CardStackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
};

export default function CardStack({
    children,
    className,
    ...props
}: CardStackProps) {

    const cards = Children.toArray(children);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const isKeyRef = useRef<boolean>(false)

    const totalCards: number = cards.length;

    if (totalCards === 0) return null;


    const lastIndex: number = (activeIndex - 1 + totalCards) % totalCards;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter" || e.key == " ") {
            e.preventDefault();
            isKeyRef.current = true;
            handleNext();
        }
    }


    const handleNext = () => {

        setHasClicked(true)

        setActiveIndex((prevIndex) => {
            return (prevIndex + 1) % totalCards;
        })
    }

    const variants = {
        'top': {
            scale: 1,
            y: 0,
            zIndex: 30,
            opacity: 1
        },
        'second': {
            scale: 0.9,
            y: 20,
            zIndex: 20,
            opacity: 1
        },
        'third': {
            scale: 0.8,
            y: 40,
            zIndex: 10,
            opacity: 1
        },
        'hidden': {
            scale: 0.8,
            y: -60,
            zIndex: 0,
            opacity: 0,
        },
        'exit': {
            y: -150,
            opacity: 0,
            zIndex: 50,
            filter: "blur(4px)",
            transition: { duration: 0.2 },
        },
        transitionEnd: {
            y: 0,
            opacity: 0,
            zIndex: 0,
            filter: 'blur(0px)'
        }
    }

    useEffect(() => {
        if (isKeyRef.current) {
            const currentCard = cardsRef.current[activeIndex];
            currentCard?.focus()
        }
    }, [activeIndex])


    return (
        <div className={cn("relative ", className)} {...props}>
            {
                cards.map((item, index) => {
                    let anim;
                    let isTop: boolean = index === activeIndex;

                    if (index === activeIndex) {
                        anim = 'top';
                        isTop = true
                    }
                    else if (index === lastIndex && hasClicked) {
                        anim = 'exit'
                    }
                    else if (index === (activeIndex + 1) % totalCards) {
                        anim = 'second'
                    }
                    else if (index === (activeIndex + 2) % totalCards) {
                        anim = 'third'
                    } else {
                        anim = 'hidden'
                    }

                    return (
                        <motion.div key={index}
                            ref={(i: HTMLDivElement | null) => {
                                if (i) cardsRef.current[index] = i;
                            }}
                            variants={variants}
                            initial={anim}
                            animate={anim}
                            transition={{ type: "spring", damping: 21, stiffness: 180 }}
                            whileTap={{ y: '6px' }}
                            className={cn("absolute inset-0 outline-none group",
                                { "pointer-events-none": !isTop },
                                "cursor-pointer select-none"
                            )}
                            onClick={() => {
                                isKeyRef.current = false;
                                handleNext();
                            }}

                            tabIndex={isTop ? 0 : -1}
                            onKeyDown={handleKeyDown}
                            role="button"
                            aria-label={`Card ${index + 1} of ${totalCards}`}
                        >
                            {item}
                        </motion.div>
                    )
                })
            }
        </div>
    )
}
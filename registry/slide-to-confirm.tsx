"use client";

import { useRef, useEffect, useState } from "react";
import {
    motion,
    useMotionValue,
    animate,
    cubicBezier,
    useTransform,
} from "motion/react";
import { ChevronRight } from "@/components/hugeicons";

interface SlideToConfirmProps {
    children: React.ReactNode;
    onConfirm: () => void;
    className?: string;
    handle?: React.ReactNode;
}

export function SlideToConfirm({
    children,
    onConfirm,
    className,
    handle,
}: SlideToConfirmProps) {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [maxTravel, setMaxTravel] = useState(0);

    useEffect(() => {
        const container = constraintsRef.current;
        const handleEl = handleRef.current;
        if (!container || !handleEl) return;

        const containerWidth = container.getBoundingClientRect().width;
        const handleWidth = handleEl.getBoundingClientRect().width;
        setMaxTravel(containerWidth - handleWidth);
    }, []);

    const opacity = useTransform(
        x,
        [0, maxTravel * 0.15, maxTravel * 0.6],
        [1, 1, 0],
        { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) },
    );

    function resetPosition() {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 35 });
    }

    function onDragEnd() {
        const container = constraintsRef.current;
        const handleEl = handleRef.current;
        if (!container || !handleEl) return;

        const containerRect = container.getBoundingClientRect();
        const handleRect = handleEl.getBoundingClientRect();

        const remainingGap = containerRect.right - handleRect.right;

        const TOLERANCE = 2;
        if (remainingGap > TOLERANCE) {
            resetPosition();
        } else {
            onConfirm();
        }
    }

    return (
        <div
            data-slot="slide-to-confirm"
            className={`bg-muted text-foreground text-sm font-medium px-1 py-1 rounded-full border-1 border-border ${className ?? ""}`}
        >
            <motion.div
                data-slot="track"
                ref={constraintsRef}
                className="relative flex items-center justify-center gap-4"
            >
                <motion.div
                    ref={handleRef}
                    className="z-10 w-fit"
                    aria-hidden="true"
                    drag="x"
                    dragConstraints={constraintsRef}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragEnd={onDragEnd}
                    dragDirectionLock
                    style={{ x }}
                >
                    <SlideHandle>{handle}</SlideHandle>
                </motion.div>
                <motion.span style={{ opacity }} className="mr-4">
                    {children}
                </motion.span>
            </motion.div>
        </div>
    );
}

export function SlideHandle({ children }: { children?: React.ReactNode }) {
    return (
        <div
            data-slot="handle"
            className="p-2 rounded-full bg-background/70 text-foreground flex items-center justify-center gap-1"
        >
            {children ?? <ChevronRight />}
        </div>
    );
}

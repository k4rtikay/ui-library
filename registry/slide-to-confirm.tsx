"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate, cubicBezier, useTransform } from "motion/react";
import { ChevronRight } from "@/components/hugeicons";

export default function SlideToConfirm() {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [maxTravel, setMaxTravel] = useState(0);

    useEffect(() => {
        const container = constraintsRef.current;
        const handle = handleRef.current;
        if (!container || !handle) return;

        const containerWidth = container.getBoundingClientRect().width;
        const handleWidth = handle.getBoundingClientRect().width;
        setMaxTravel(containerWidth - handleWidth);
    }, []);

    const opacity = useTransform(
        x,
        [0, maxTravel * 0.2, maxTravel * 0.6],
        [1, 1, 0],
        { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) },
    );

    function resetPosition() {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 25 });
    }

    function onDragEnd() {
        const container = constraintsRef.current;
        const handle = handleRef.current;
        if (!container || !handle) return;

        const containerRect = container.getBoundingClientRect();
        const handleRect = handle.getBoundingClientRect();

        const remainingGap = containerRect.right - handleRect.right;

        const TOLERANCE = 5;
        if (remainingGap > TOLERANCE) {
            resetPosition();
        }
    }

    return (
        <div
            data-slot="slide-to-confirm"
            className="bg-muted text-foreground text-sm font-medium px-1 py-1 rounded-full border-1 border-border"
        >
            <motion.div
                data-slot="track"
                ref={constraintsRef}
                className="relative flex items-center justify-center gap-4"
            >
                <motion.div
                    className="z-10 p-2 w-fit rounded-full bg-white text-red-600 flex items-center justify-center gap-1"
                    aria-hidden="true"
                    drag="x"
                    dragConstraints={constraintsRef}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragEnd={onDragEnd}
                    dragDirectionLock
                    style={{ x }}
                    ref={handleRef}
                    data-slot="handle"
                >
                    <ChevronRight />
                </motion.div>
                <motion.span style={{ opacity }} className="mr-4">
                    Slide to Unlock
                </motion.span>
            </motion.div>
        </div>
    );
}

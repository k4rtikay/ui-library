"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    CodeCircleIcon,
    SparklesIcon,
    AccessibilityIcon,
} from "@hugeicons/core-free-icons";

const features = [
    {
        title: "Copy-paste friendly",
        description:
            "Just like shadcn/ui, you own the code. Drop it in and customize it.",
        icon: CodeCircleIcon,
        rotate: -5,
        xOffset: -152,
        yOffset: -14,
        mobileRotate: -3,
        mobileXOffset: -8,
        mobileYOffset: -164,
    },
    {
        title: "Built with Motion",
        description:
            "Powered by the industry standard for fluid, physics-based React animations.",
        icon: SparklesIcon,
        rotate: 2,
        xOffset: 0,
        yOffset: 12,
        mobileRotate: 2,
        mobileXOffset: 8,
        mobileYOffset: 0,
    },
    {
        title: "Highly Accessible",
        description:
            "Animations automatically respect users' prefers-reduced-motion settings.",
        icon: AccessibilityIcon,
        rotate: 5,
        xOffset: 152,
        yOffset: -8,
        mobileRotate: -2,
        mobileXOffset: -4,
        mobileYOffset: 164,
    },
];

export function FeatureFan() {
    return (
        <div className="relative mt-- md:mt-10 flex h-150 w-full items-center justify-center overflow-x-clip not-prose md:h-72">
            {features.map((feature, index) => {
                const hoverOffset =
                    feature.rotate < 0 ? 6 : feature.rotate > 0 ? -6 : 0;

                return (
                    <motion.div
                        key={feature.title}
                        initial={{
                            opacity: 0,
                            x: "var(--feature-x)",
                            y: "calc(var(--feature-y) + 12px)",
                            rotate: "var(--feature-rotate)",
                        }}
                        animate={{
                            opacity: 1,
                            x: "var(--feature-x)",
                            y: "var(--feature-y)",
                            rotate: "var(--feature-rotate)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 24,
                            delay: index * 0.08,
                        }}
                        whileHover={{
                            x: `calc(var(--feature-x) + ${hoverOffset}px)`,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                stiffness: 280,
                                damping: 24,
                            },
                        }}
                        style={
                            {
                                "--desktop-x": `${feature.xOffset}px`,
                                "--desktop-y": `${feature.yOffset}px`,
                                "--desktop-rotate": `${feature.rotate}deg`,
                                "--mobile-x": `${feature.mobileXOffset}px`,
                                "--mobile-y": `${feature.mobileYOffset}px`,
                                "--mobile-rotate": `${feature.mobileRotate}deg`,
                            } as CSSProperties
                        }
                        className="absolute flex w-[min(18rem,calc(100%-6rem))] flex-col gap-5 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-md [--feature-rotate:var(--mobile-rotate)] [--feature-x:var(--mobile-x)] [--feature-y:var(--mobile-y)] md:w-44 md:[--feature-rotate:var(--desktop-rotate)] md:[--feature-x:var(--desktop-x)] md:[--feature-y:var(--desktop-y)]"
                    >
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <HugeiconsIcon icon={feature.icon} size={20} />
                        </div>

                        <div>
                            <h3 className="mb-1.5 text-base font-semibold tracking-tight text-card-foreground text-balance">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-snug text-muted-foreground text-pretty">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

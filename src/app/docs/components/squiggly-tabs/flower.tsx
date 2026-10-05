"use client";

import { motion, useReducedMotion } from "motion/react";

import { useSquiggleTabs } from "../../../../../registry/squiggly-tabs";

const FLOWER_COLORS: Record<string, string> = {
    models: "#f9a8d4",
    agents: "#fcd34d",
    workflows: "#93c5fd",
    tools: "#86efac",
};

const FALLBACK_COLOR = "#f9a8d4";

// Each petal differs slightly in shape and angle so the flower looks hand-drawn.
// Petals start at the flower center (100, 62) and are rotated around it.
const petals = [
    { rotate: -4, d: "M100 62 C80 46 82 16 101 8 C121 16 122 46 100 62 Z" },
    { rotate: 70, d: "M100 62 C83 44 80 18 99 7 C119 18 121 44 100 62 Z" },
    { rotate: 141, d: "M100 62 C78 48 85 14 103 9 C122 20 118 47 100 62 Z" },
    { rotate: 215, d: "M100 62 C82 42 84 15 100 6 C120 15 123 43 100 62 Z" },
    { rotate: 289, d: "M100 62 C81 47 83 17 102 10 C121 18 119 41 100 62 Z" },
];

export function Flower() {
    const { activeTab } = useSquiggleTabs();
    const reduceMotion = useReducedMotion();
    const color = FLOWER_COLORS[activeTab] ?? FALLBACK_COLOR;

    return (
        <svg
            viewBox="0 0 200 240"
            fill="none"
            aria-hidden
            className="h-full max-h-56 w-full stroke-foreground"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <motion.g
                style={{ originX: 0.5, originY: 1 }}
                animate={reduceMotion ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
                transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            >
                {/* stem */}
                <path d="M100 74 C93 120 108 170 98 232" />

                {/* leaves */}
                <path
                    d="M99 196 C70 194 54 176 52 160 C78 158 95 174 99 196 Z"
                    fill="#bbf7d0"
                />
                <path
                    d="M102 160 C128 160 146 144 148 128 C122 126 106 142 102 160 Z"
                    fill="#bbf7d0"
                />

                {/* petals */}
                {petals.map((petal, i) => (
                    <motion.path
                        key={i}
                        d={petal.d}
                        transform={`rotate(${petal.rotate} 100 62)`}
                        initial={false}
                        animate={{ fill: color }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                ))}

                {/* center */}
                <circle cx="100" cy="62" r="15" fill="#fef3c7" />
                <path d="M94 62 Q100 68 106 62" />
                <circle cx="95" cy="56" r="1.2" className="fill-foreground" />
                <circle cx="105" cy="56" r="1.2" className="fill-foreground" />
            </motion.g>
        </svg>
    );
}

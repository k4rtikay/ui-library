"use client";

import { ChevronRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

const chevronWrapperVariants: Variants = {
    rest: { width: 0, opacity: 0 },
    hover: {
        width: 16,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 20 },
    },
};

const chevronIconVariants: Variants = {
    rest: { x: -8, opacity: 0 },
    hover: {
        x: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 500, damping: 20 },
    },
};

export function DocsLinkButton() {
    return (
        <motion.a
            href="/docs"
            initial="rest"
            whileHover="hover"
            className="w-full md:w-44 text-sm font-medium tracking-wide leading-0.5 ring-2 ring-foreground/10 bg-background/70 text-foreground px-4 py-3 rounded-xl flex gap-2 items-center justify-center shadow-[inset_0px_2px_8px_0px_rgba(255,255,255,0.55),0px_2px_16px_0px_rgba(0,0,0,0.1)]"
        >
            Browse the Docs
            <motion.span
                variants={chevronWrapperVariants}
                className="flex items-center overflow-hidden"
            >
                <motion.span variants={chevronIconVariants}>
                    <ChevronRight className="h-4 w-4" />
                </motion.span>
            </motion.span>
        </motion.a>
    );
}

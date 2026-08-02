"use client";

import { Star } from "lucide-react";
import { motion, Variants } from "motion/react";

const starWrapperVariants: Variants = {
    rest: { width: 0, opacity: 0 },
    hover: {
        width: 16,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 20 },
    },
};

const starIconVariants: Variants = {
    rest: { scale: 0, rotate: -30 },
    hover: {
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 500, damping: 12 },
    },
};

export function GithubStarButton() {
    return (
        <motion.a
            href="https://github.com/k4rtikay/ui-library"
            target="_blank"
            rel="noopener noreferrer"
            initial="rest"
            whileHover="hover"
            className="w-full md:w-44 text-sm font-medium tracking-wide leading-0.5 ring-2 ring-white/10 bg-zinc-900 text-zinc-50 px-4 py-3 rounded-xl flex gap-2 items-center justify-center shadow-[inset_0px_2px_8px_0px_rgba(255,255,255,0.55),0px_2px_16px_0px_rgba(0,0,0,0.1)]"
        >
            Star on Github
            <motion.div
                variants={starWrapperVariants}
                className="flex items-center overflow-hidden"
            >
                <motion.div variants={starIconVariants}>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </motion.div>
            </motion.div>
        </motion.a>
    );
}

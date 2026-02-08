"use client";

import { StaggerReveal } from "./stagger-reveal";

export default function StaggerRevealTextDemo() {
    return (
        <div className="flex flex-col gap-6 p-8">
            <h2 className="text-3xl font-semibold">
                <StaggerReveal variant="text" by="character" staggerDelay={0.03}>
                    Hello World
                </StaggerReveal>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                <StaggerReveal variant="text" by="word" staggerDelay={0.1}>
                    This text animates word by word
                </StaggerReveal>
            </p>
        </div>
    );
}

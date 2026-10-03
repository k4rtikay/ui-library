"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion, type Variants } from "motion/react";

interface SquiggleTriggerProps extends React.ComponentProps<
    typeof TabsTrigger
> {
    isActive: boolean;
    direction: "left" | "right";
}

const squiggle =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath d='M0 3 Q3 0 6 3 T12 3' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")";

const tabs = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "profile", label: "Profile"},
    { value: "settings", label: "Settings" },
];

const SHOWN = "inset(0 0 0 0)";
const COLLAPSED_LEFT = "inset(0 100% 0 0)";
const COLLAPSED_RIGHT = "inset(0 0 0 100%)";

const DURATION = 0.26;

const squiggleVariants = {
    enter: (dir: "left" | "right") => ({
        clipPath: dir === "right" ? COLLAPSED_LEFT : COLLAPSED_RIGHT,
    }),
    center: {
        clipPath: SHOWN,
        transition: {
            duration: DURATION,
            ease: "easeInOut",
            delay: DURATION * 0.6,
        },
    },
    exit: (dir: "left" | "right") => ({
        clipPath: dir === "right" ? COLLAPSED_RIGHT : COLLAPSED_LEFT,
        transition: { duration: DURATION, ease: "easeInOut" },
    }),
};

export function SquiggleTrigger({
    value,
    children,
    isActive,
    direction,
    ...props
}: SquiggleTriggerProps) {
    return (
        <TabsTrigger
            value={value}
            className="group relative after:hidden data-[state=active]:after:hidden"
            {...props}
        >
            {children}

            <AnimatePresence initial={false} custom={direction}>
                {isActive && (
                    <motion.span
                        key="squiggle"
                        custom={direction}
                        variants={squiggleVariants as Variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 -bottom-1 h-[6px] bg-current"
                        style={{
                            maskImage: squiggle,
                            WebkitMaskImage: squiggle,
                            maskRepeat: "repeat-x",
                            WebkitMaskRepeat: "repeat-x",
                        }}
                    />
                )}
            </AnimatePresence>
        </TabsTrigger>
    );
}

export function TabsSquiggle() {
    const [activeTab, setActiveTab] = useState("overview");
    const [direction, setDirection] = useState<"left" | "right">("right");

    const handleTabChange = (value: string) => {
        const nextIndex = tabs.findIndex((tab) => tab.value === value);
        const prevIndex = tabs.findIndex((tab) => tab.value === activeTab);
        if (prevIndex - nextIndex > 0) {
            setDirection("left");
        } else {
            setDirection("right");
        }
        setActiveTab(value);
    };

    return (
        <Tabs
            value={activeTab}
            onValueChange={(value) => handleTabChange(value)}
        >
            <TabsList variant="line">
                {tabs.map((tab) => (
                    <SquiggleTrigger
                        key={tab.value}
                        value={tab.value}
                        isActive={activeTab === tab.value}
                        direction={direction}
                    >
                        {tab.label}
                    </SquiggleTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

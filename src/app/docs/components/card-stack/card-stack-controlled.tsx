"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    CardStack,
    CardStackIndicator
} from "./card-stack"; // Adjust path to where you saved the component

// Import Shadcn primitives
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CardStackControlledDemo() {
    // 1. CONTROLLED STATE
    // We lift the state up so we can sync the stack with the indicator
    const [activeIndex, setActiveIndex] = useState(0);

    // 2. CUSTOM OFFSETS (Optional)
    // Let's make the stack "fan out" a bit more than the default
    const customOffsets = [
        { scale: 1, y: 0, opacity: 1 },
        { scale: 0.92, y: 20, opacity: 0.9 },
        { scale: 0.84, y: 40, opacity: 0.7 },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-10 w-full bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-dashed">

            {/* 3. THE STACK */}
            <CardStack
                // State Control
                activeIndex={activeIndex}
                onIndexChange={setActiveIndex}

                // Autoplay Behavior
                autoAdvance={true}
                autoAdvanceInterval={4000}
                pauseOnHover

                // Custom Styles
                offsets={customOffsets}
                maxVisibleCards={3}
                className="h-[160px] w-[350px] md:h-[200px] md:w-[450px]"
            >
                {TESTIMONIALS.map((item) => (
                    <Card
                        key={item.id}
                        className="h-full w-full border-neutral-200 shadow-sm transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
                    >
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <Avatar>
                                <AvatarImage src={item.avatar} alt={item.name} />
                                <AvatarFallback>{item.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-base font-semibold text-neutral-900 dark:text-white">
                                    {item.name}
                                </CardTitle>
                                <CardDescription className="text-xs font-medium text-neutral-500">
                                    {item.role}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                "{item.content}"
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </CardStack>

            {/* 4. THE INDICATOR */}
            {/* This syncs perfectly because it uses the same `activeIndex` */}
            <div className="flex flex-col items-center gap-2">
                <CardStackIndicator
                    totalCards={TESTIMONIALS.length}
                    activeIndex={activeIndex}
                />
                <p className="text-xs text-muted-foreground mt-2">
                    Autoplay active • Click card to advance manually
                </p>
            </div>

        </div>
    );
}

// --- Mock Data ---
const TESTIMONIALS = [
    {
        id: 1,
        name: "Emily Carter",
        role: "UX Designer @ Adobe",
        avatar: "https://i.pravatar.cc/150?u=1",
        content: "The controlled API for this component is a lifesaver. Syncing the card stack with our external pagination logic was seamless.",
    },
    {
        id: 2,
        name: "Marcus Reid",
        role: "Frontend Lead @ Vercel",
        avatar: "https://i.pravatar.cc/150?u=2",
        content: "Finally, a stack component that doesn't fight you on z-index context. The physics feel native and the autoplay pauses correctly on hover.",
    },
    {
        id: 3,
        name: "Sarah Jenkins",
        role: "Product Manager @ Linear",
        avatar: "https://i.pravatar.cc/150?u=3",
        content: "We used this for our 'What's New' feature widget. Engagement went up by 40% because users actually enjoy clicking through the updates.",
    },
    {
        id: 4,
        name: "David Chen",
        role: "Founder @ TailwindUI",
        avatar: "https://i.pravatar.cc/150?u=4",
        content: "Simple, composable, and accessible. It respects reduced motion preferences and keyboard navigation out of the box.",
    },
];
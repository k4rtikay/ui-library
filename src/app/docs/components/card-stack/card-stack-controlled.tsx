"use client";

import { useState } from "react";
import {
    CardStack,
    CardStackIndicator
} from "./card-stack";

export default function CardStackControlledDemo() {
    const [activeIndex, setActiveIndex] = useState(0);

    const customOffsets = [
        { scale: 1, y: 0, opacity: 1 },
        { scale: 0.95, y: -20, opacity: 0.95 },
        { scale: 0.90, y: -40, opacity: 0.85 },
    ]

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-4">

            {/* THE STACK */}
            <CardStack
                activeIndex={activeIndex}
                onIndexChange={setActiveIndex}
                autoAdvance={true}
                autoAdvanceInterval={4000}
                pauseOnHover
                offsets={customOffsets}
                maxVisibleCards={3}
                className="h-[220px] w-[260px] sm:h-[220px] sm:w-[320px]"
            >
                {DAILY_ACTIVITIES.map((day) => (
                    <div
                        key={day.id}
                        className="h-full w-full rounded-2xl p-5 flex flex-col gap-3"
                        style={{
                            background: "linear-gradient(135deg, #e8eef9 0%, #d4dff2 100%)",
                        }}
                    >
                        {/* Day Header */}
                        <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                            {day.day}
                        </h2>

                        {/* Activity Groups */}
                        <div className="flex flex-col gap-2.5 flex-1">
                            {day.groups.map((group, groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className="bg-white/70 rounded-xl px-4 py-3"
                                >
                                    {group.activities.map((activity, actIndex) => (
                                        <div
                                            key={actIndex}
                                            className="flex items-center gap-3 py-1"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                                            <span className="text-sm text-neutral-800 font-medium">
                                                {activity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </CardStack>

            {/* THE INDICATOR */}
            <div className="flex flex-col items-center gap-2">
                <CardStackIndicator
                    totalCards={DAILY_ACTIVITIES.length}
                    activeIndex={activeIndex}
                />
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    Click card to advance
                </p>
            </div>

        </div>
    );
}

// --- Daily Activities Data ---
const DAILY_ACTIVITIES = [
    {
        id: 1,
        day: "Monday",
        groups: [
            { activities: ["Team standup"] },
            { activities: ["Dentist appointment", "Focus time"] },
        ],
    },
    {
        id: 2,
        day: "Tuesday",
        groups: [
            { activities: ["Morning yoga"] },
            { activities: ["Client call", "Lunch with Sarah"] },
        ],
    },
    {
        id: 3,
        day: "Wednesday",
        groups: [
            { activities: ["Gym session"] },
            { activities: ["Sprint planning", "Design review"] },
        ],
    },
    {
        id: 4,
        day: "Thursday",
        groups: [
            { activities: ["Morning run"] },
            { activities: ["1:1 with manager", "Deep work"] },
        ],
    },
    {
        id: 5,
        day: "Friday",
        groups: [
            { activities: ["Sleep in"] },
            { activities: ["Weekly retro", "Team lunch"] },
        ],
    },
];
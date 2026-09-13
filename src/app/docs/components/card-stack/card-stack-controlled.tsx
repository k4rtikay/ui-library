"use client";

import { useState } from "react";
import {
    CardStack,
    CardStackIndicator,
} from "../../../../../registry/card-stack";

export default function CardStackControlledDemo() {
    const [activeIndex, setActiveIndex] = useState(0);

    const customOffsets = [
        { scale: 1, y: 0, opacity: 1 },
        { scale: 0.95, y: -20, opacity: 0.95 },
        { scale: 0.9, y: -40, opacity: 0.85 },
    ];

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-4">
            <CardStack
                exitOffset={40}
                autoAdvance={true}
                autoAdvanceInterval={4000}
                offsets={customOffsets}
                activeIndex={activeIndex}
                onIndexChange={setActiveIndex}
            >
                {PROFILES.map((profile, index) => {
                    const { bg, text, accent } = profile.colors;
                    const initials = profile.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("");

                    return (
                        <div
                            key={profile.id}
                            className="relative flex w-xs aspect-2/1 flex-col justify-between gap-1.5 overflow-hidden rounded-xl py-3 pl-3 pr-6 shadow-[0_2px_4px_0_rgba(0,0,0,0.15),inset_0_2px_4px_1px_rgba(255,255,255,0.9),inset_0_-2px_4px_1px_rgba(0,0,0,0.05)] sm:gap-2 sm:py-4 sm:pl-4 sm:pr-7 md:py-5 md:pl-5 md:pr-9"
                            style={{
                                backgroundColor: bg,
                                color: text,
                                borderColor: accent,
                            }}
                        >
                            <div className="z-10 flex items-center gap-2 sm:gap-3">
                                <div
                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs md:h-10 md:w-10 md:text-sm"
                                    style={{ backgroundColor: accent }}
                                >
                                    {initials}
                                </div>

                                <div className="flex flex-col leading-tight">
                                    <span className="font-display text-xs font-semibold tracking-tight sm:text-sm md:text-base">
                                        {profile.name}
                                    </span>

                                    <span
                                        className="text-[10px] font-medium sm:text-xs"
                                        style={{ color: accent }}
                                    >
                                        {profile.handle}
                                    </span>
                                </div>
                            </div>

                            <p className="z-10 w-full text-balance text-[11px] font-medium opacity-80 sm:text-xs md:text-sm">
                                {profile.bio}
                            </p>

                            <div className="z-10 flex flex-wrap items-center gap-1 sm:gap-1.5">
                                {profile.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border px-1.5 py-0.5 text-[8px] font-medium sm:px-2 sm:text-[9px] md:px-2.5 md:py-1 md:text-[10px]"
                                        style={{
                                            backgroundColor: `${accent}1A`,
                                            color: accent,
                                            borderColor: accent,
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="absolute inset-y-0 right-0 z-10 flex w-5 flex-col items-center justify-between gap-x-1 py-2 pr-1.5 sm:w-6 sm:py-3 sm:pr-2 md:w-8 md:py-4 md:pr-3">
                                {Array.from({ length: 8 }).map((_, row) => (
                                    <div
                                        key={row}
                                        className="flex gap-0.5 sm:gap-1"
                                    >
                                        {[0, 1].map((col) => {
                                            const heat =
                                                profile.heatmap[
                                                    (row * 2 + col + index) %
                                                        profile.heatmap.length
                                                ];

                                            return (
                                                <span
                                                    key={col}
                                                    className="h-1.5 w-1.5 rounded-[2px] sm:h-2 sm:w-2 md:h-2.5 md:w-2.5"
                                                    style={{
                                                        backgroundColor: heat,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </CardStack>

            {/*<div className="flex flex-col items-center gap-2">
                <CardStackIndicator
                    totalCards={PROFILES.length}
                    activeIndex={activeIndex}
                />

                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    Click card to advance
                </p>
            </div>*/}
        </div>
    );
}

const PROFILES = [
    {
        id: 1,
        name: "Alex Chen",
        handle: "@alexcodes",
        skills: ["TypeScript", "React", "Node.js"],
        bio: "Building clean, minimal software for the modern web.",
        colors: {
            bg: "#F0F7FF",
            text: "#172033",
            accent: "#4F8EF7",
        },
        heatmap: [
            "#E7F0FF",
            "#D7E7FF",
            "#BBD4FF",
            "#91B8FF",
            "#6D9DF7",
            "#4F8EF7",
        ],
    },
    {
        id: 2,
        name: "Maya Torres",
        handle: "@mayadev",
        skills: ["Python", "Django", "PostgreSQL"],
        bio: "Full-stack engineer riding the deep end of the stack.",
        colors: {
            bg: "#F3F9F7",
            text: "#19312B",
            accent: "#48A88A",
        },
        heatmap: [
            "#E5F4EE",
            "#D2ECE3",
            "#B1DECf",
            "#88CDB5",
            "#64B79B",
            "#48A88A",
        ],
    },
    {
        id: 3,
        name: "Sam Okafor",
        handle: "@sambuilds",
        skills: ["Rust", "Go", "Kubernetes"],
        bio: "Open-source maintainer and systems tinkerer.",
        colors: {
            bg: "#F6F5FC",
            text: "#27243A",
            accent: "#8176C9",
        },
        heatmap: [
            "#EDEBF8",
            "#DDD9F1",
            "#C7C1E5",
            "#ACA4D9",
            "#958AD0",
            "#8176C9",
        ],
    },
    {
        id: 4,
        name: "Elena Voss",
        handle: "@elenacodes",
        skills: ["Swift", "SwiftUI", "Figma"],
        bio: "Crafting premium developer experiences, pixel by pixel.",
        colors: {
            bg: "#FFF7F3",
            text: "#382922",
            accent: "#E88A6A",
        },
        heatmap: [
            "#FCEDE7",
            "#F9DDD3",
            "#F4C4B5",
            "#EEA891",
            "#EA9779",
            "#E88A6A",
        ],
    },
    {
        id: 5,
        name: "Jordan Lee",
        handle: "@jlee.dev",
        skills: ["Java", "Spring", "AWS"],
        bio: "Coffee-fueled backend engineer shipping resilient APIs.",
        colors: {
            bg: "#F3F6FA",
            text: "#202936",
            accent: "#6B8FB8",
        },
        heatmap: [
            "#E7EDF5",
            "#D5E0ED",
            "#BDCEE1",
            "#A3BAD3",
            "#87A4C2",
            "#6B8FB8",
        ],
    },
    {
        id: 6,
        name: "Priya Nair",
        handle: "@priyabuilds",
        skills: ["Vue", "Tailwind", "GraphQL"],
        bio: "Designing delightful, accessible frontend interfaces.",
        colors: {
            bg: "#FFF8F0",
            text: "#352B20",
            accent: "#D59A4A",
        },
        heatmap: [
            "#FBF0DE",
            "#F7E4C7",
            "#F0D2A7",
            "#E7BD82",
            "#DDAA63",
            "#D59A4A",
        ],
    },
];

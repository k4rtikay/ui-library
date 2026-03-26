"use client";

import Image from "next/image";
import {
    SharedMenu,
    SharedMenuItem,
    SharedMenuImage,
    SharedMenuContent,
    SharedMenuNumber
} from "./shared-menu";
import { cn } from "@/lib/utils";

const items = [
    {
        image: "/item-1.jpg",
        title: "Anime Collection",
        description: "Visuals and characters",
        number: "1",
    },
    {
        image: "/item-2.jpg",
        title: "Rick Ross",
        description: "American rapper",
        number: "2",
    },
];

export default function SharedMenuDemo() {
    return (
        <div className="p-4">
            <SharedMenu items={items}>
                {(item, index, viewType) => (
                    <SharedMenuItem
                        key={index}
                        index={index}
                        viewType={viewType}
                        className={cn(
                            viewType === "list" && "flex items-center gap-4 transition-colors",
                            viewType === "card" && "hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-shadow",
                            viewType === "compact" && "absolute w-40 h-40"
                        )}
                        animate={
                            viewType === "compact"
                                ? {
                                    rotate: (index - items.length / 2) * 8,
                                    x: (index - items.length / 2) * 6,
                                    y: index * 4,
                                }
                                : { rotate: 0, x: 0, y: 0 }
                        }
                        style={viewType === "compact" ? { zIndex: index } : {}}
                    >
                        <SharedMenuImage
                            className={cn(
                                viewType === "list" && "relative w-[80px] h-[80px]",
                                viewType === "card" && "relative w-full h-40 mb-3 rounded-xs overflow-hidden",
                                viewType === "compact" && "w-full h-full relative"
                            )}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={cn(
                                    (viewType === "list" || viewType === "compact") && "rounded-xs object-cover",
                                    viewType === "card" && "rounded-xs object-cover"
                                )}
                            />
                        </SharedMenuImage>

                        {viewType !== "compact" && (
                            <div className={cn(viewType === "list" ? "flex-1 min-w-0 flex items-center gap-4" : "space-y-2")}>
                                <SharedMenuContent className={cn(viewType === "list" ? "flex-1 min-w-0" : "space-y-2")}>
                                    <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                                        {item.title}
                                    </h3>
                                    {viewType === "list" ? (
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                            {item.description}
                                        </p>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                                {item.description}
                                            </p>
                                            <SharedMenuNumber className="text-md font-bold text-neutral-400">
                                                #{item.number}
                                            </SharedMenuNumber>
                                        </div>
                                    )}
                                </SharedMenuContent>

                                {viewType === "list" && (
                                    <SharedMenuNumber className="text-lg font-bold text-neutral-400 dark:text-neutral-600">
                                        #{item.number}
                                    </SharedMenuNumber>
                                )}
                            </div>
                        )}
                    </SharedMenuItem>
                )}
            </SharedMenu>
        </div>
    );
}
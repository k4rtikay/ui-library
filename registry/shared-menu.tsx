"use client"
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type ViewType = "list" | "card" | "compact";

const listItems = [
    {
        "image": "/item-1.jpg",
        "title": "Item 1",
        "description": "anime",
        "number": "1",
    },
    {
        "image": "/item-2.jpg",
        "title": "Item 2",
        "description": "rick ross",
        "number": "2",
    }
]

export function SharedMenu() {
    const [viewType, setViewType] = useState<ViewType>("list");

    return (
        <section className="flex flex-col gap-4">
            <div className="flex gap-4 h-fit">
                <CustomButton
                    title="List View"
                    isActive={viewType === "list"}
                    onClick={() => setViewType("list")}
                />
                <CustomButton
                    title="Card View"
                    isActive={viewType === "card"}
                    onClick={() => setViewType("card")}
                />
                <CustomButton
                    title="Compact View"
                    isActive={viewType === "compact"}
                    onClick={() => setViewType("compact")}
                />
            </div>

            <div className="bg-[#2C2C2C] w-full h-px flex-shrink-0" />

            <motion.div
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 40,
                    layout: { duration: 0.3 }
                }}
                className="min-h-[240px] relative overflow-hidden w-full"
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {viewType === "list" && (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ListView items={listItems} />
                        </motion.div>
                    )}
                    {viewType === "card" && (
                        <motion.div
                            key="card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <CardView items={listItems} />
                        </motion.div>
                    )}
                    {viewType === "compact" && (
                        <motion.div
                            key="compact"
                            initial={{ opacity: 0, rotate: -5 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 5 }}
                        >
                            <CompactView items={listItems} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    )
}

function ListView({ items }: { items: typeof listItems }) {
    return (
        <div className="space-y-3">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    layoutId={`item-${index}`}
                    className="flex items-center gap-4 transition-colors"
                >
                    <motion.div layoutId={`image-${index}`}>
                        <Image
                            height={80}
                            width={80}
                            src={item.image}
                            alt={item.title}
                            className="rounded-[30px] [corner-shape:squircle] object-cover"
                        />
                    </motion.div>
                    <motion.div layoutId={`content-${index}`} className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                            {item.title}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {item.description}
                        </p>
                    </motion.div>
                    <motion.span layoutId={`number-${index}`} className="text-lg font-bold text-neutral-400 dark:text-neutral-600">
                        #{item.number}
                    </motion.span>
                </motion.div>
            ))}
        </div>
    );
}

function CardView({ items }: { items: typeof listItems }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    layoutId={`item-${index}`}
                    className=" hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-shadow"
                >
                    <motion.div layoutId={`image-${index}`} className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
                        <Image
                            fill
                            src={item.image}
                            alt={item.title}
                            className="rounded-[20px] [corner-shape:squircle] object-cover"
                        />
                    </motion.div>
                    <motion.div layoutId={`content-${index}`} className="space-y-2">
                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                            {item.title}
                        </h3>
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                {item.description}
                            </p>

                            <motion.span layoutId={`number-${index}`} className="text-md font-bold text-neutral-400">
                                #{item.number}
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>

            ))
            }
        </div >
    );
}

function CompactView({ items }: { items: typeof listItems }) {
    return (
        <div className="space-y-4">
            <div className="mx-auto relative w-40 h-40 mt-3">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        layoutId={`item-${index}`}
                        animate={{
                            rotate: (index - items.length / 2) * 8,
                            x: (index - items.length / 2) * 6,
                            y: index * 4,
                        }}
                        className="absolute w-40 h-40"
                        style={{
                            zIndex: index,
                        }}
                    >
                        <motion.div layoutId={`image-${index}`} className="w-full h-full">
                            <Image
                                height={160}
                                width={160}
                                src={item.image}
                                alt={item.title}
                                className="rounded-[30px] [corner-shape:squircle] object-cover w-full h-full"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            <span className="mx-auto w-fit text-sm text-neutral-600 dark:text-neutral-400 block">
                {items.length} items
            </span>
        </div>
    );
}

interface CustomButtonProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

function CustomButton({ title, isActive, onClick }: CustomButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-2 rounded-[50px] [corner-shape:squircle] font-medium text-sm transition-all",
                isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            )}
        >
            {title}
        </button>
    )
}

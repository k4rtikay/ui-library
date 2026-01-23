"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import CopyButton from "./copy-button";

interface CollapsibleCodeProps {
    children: React.ReactNode
    maxHeight?: number
    className?: string
}

export default function CollapsibleCode({ children, maxHeight = 300, className }: CollapsibleCodeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const codeRef = useRef<HTMLDivElement>(null);

    

    return (
        <div className={cn("relative h-full", className)}>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : `${maxHeight}px` }}
                transition={{ duration: 0.2, type: "spring", damping: 24, stiffness: 150 }}
                className="overflow-hidden overflow-x-auto"
                ref={codeRef}
            >
                <CopyButton
                    onCopy = {()=>{ return codeRef.current?.innerText || ""}}
                    className="absolute right-4 top-4 z-10 inline-flex h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
                />
                {children}
            </motion.div>
            <div
                className={cn("absolute inset-x-0 bottom-0 flex justify-center items-center w-full pb-4 pt-12 transition-all duration-300",
                    isOpen ? "bg-transparent h-auto pointer-events-none"
                        :
                        "bg-gradient-to-t from-background via-background/80 to-transparent h-32"
                )}
            >
                <Button
                    variant={"secondary"}
                    size={"sm"}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={cn("h-8 gap-2 bg-background border shadow-sm backdrop-blur-md",
                        isOpen ? "pointer-events-auto translate-y-2" : "translate-y-0")}
                >
                    {isOpen ? "Hide" : "Show"}
                </Button>
            </div>
        </div>
    );
}

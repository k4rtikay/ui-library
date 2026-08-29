"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import CopyButton from "./copy-button";

interface CollapsibleCodeProps {
    children: React.ReactNode;
    maxHeight?: number;
    className?: string;
}

export default function CollapsibleCode({
    children,
    maxHeight = 400,
    className,
}: CollapsibleCodeProps) {
    const codeRef = useRef<HTMLDivElement>(null);

    return (
        <div className={cn("relative bg-muted", className)}>
            <CopyButton
                onCopy={() => codeRef.current?.innerText || ""}
                className="absolute right-4 top-4 z-10 h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
            />
            <div
                ref={codeRef}
                className="overflow-auto [&_pre]:min-w-full [&_pre]:w-max [&_pre]:overflow-hidden bg-muted"
                style={{ height: maxHeight }}
            >
                {children}
            </div>
        </div>
    );
}

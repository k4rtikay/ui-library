"use client";

import { useRef, useState } from "react";

interface HoldToConfirmProps {
    children: React.ReactNode;
    onConfirm: () => void;
    holdDuration?: number;
    className?: string;
}

export default function HoldToConfirm({
    children,
    onConfirm,
    holdDuration = 1000,
    className,
}: HoldToConfirmProps) {
    const isHolding = useRef(false);
    const [keyHolding, setKeyHolding] = useState(false);

    const handlePointerDown = () => {
        isHolding.current = true;
    };

    const handlePointerUp = () => {
        isHolding.current = false;
    };

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (e.propertyName === "clip-path" && (isHolding.current || keyHolding)) {
            onConfirm();
            isHolding.current = false;
            setKeyHolding(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault();
            setKeyHolding(true);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " || e.key === "Enter") {
            setKeyHolding(false);
        }
    };

    return (
        <button
            className="group relative bg-muted text-foreground font-medium px-4 py-3 rounded-full overflow-hidden flex items-center justify-center active:scale-98 transition-transform duration-150 ease-out"
            data-holding={keyHolding || undefined}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={() => setKeyHolding(false)}
            style={{ ["--hold-duration" as string]: `${holdDuration}ms` }}
        >
            <div
                aria-hidden="true"
                onTransitionEnd={handleTransitionEnd}
                className="absolute inset-0 bg-red-100 text-red-600 flex items-center justify-center gap-1 [clip-path:inset(0_100%_0_0)] group-active:[clip-path:inset(0px_0px_0px_0px)] data-[holding]:[clip-path:inset(0px_0px_0px_0px)] transition-[clip-path] duration-240 ease-out group-active:duration-[var(--hold-duration)] data-[holding]:duration-[var(--hold-duration)] group-active:ease-linear data-[holding]:ease-linear"
                data-holding={keyHolding || undefined}
            >
                {children}
            </div>
            {children}
        </button>
    );
}
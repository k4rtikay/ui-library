"use client";

import { useEffect, useRef, useState } from "react";

import { CheckCircle2, Loader2 } from "@/components/hugeicons";

import {
    LoaderButton,
    type ButtonState,
} from "../../../registry/loader-button";

type ComparisonState = Extract<ButtonState, "idle" | "loading" | "success">;

const LOADING_DURATION = 1700;
const SUCCESS_DURATION = 2000;

function StaticLoaderButton({
    state,
    onClick,
}: {
    state: ComparisonState;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            disabled={state !== "idle"}
            onClick={onClick}
            aria-busy={state === "loading"}
            className="flex h-12 w-30 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
            {state === "idle" && "Submit"}
            {state === "loading" && (
                <span className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin" />
                    Processing
                </span>
            )}
            {state === "success" && (
                <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-4" />
                    Success
                </span>
            )}
        </button>
    );
}

function useButtonSequence() {
    const [state, setState] = useState<ComparisonState>("idle");
    const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (loadingTimer.current) clearTimeout(loadingTimer.current);
            if (resetTimer.current) clearTimeout(resetTimer.current);
        };
    }, []);

    const play = () => {
        if (state !== "idle") return;

        if (loadingTimer.current) clearTimeout(loadingTimer.current);
        if (resetTimer.current) clearTimeout(resetTimer.current);

        setState("loading");
        loadingTimer.current = setTimeout(
            () => setState("success"),
            LOADING_DURATION,
        );
        resetTimer.current = setTimeout(
            () => setState("idle"),
            LOADING_DURATION + SUCCESS_DURATION,
        );
    };

    return { state, play };
}

export function MotionComparison() {
    const withoutMotion = useButtonSequence();
    const withMotion = useButtonSequence();

    return (
        <div className="not-prose my-16">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-h-48 flex-col items-center justify-center gap-6 rounded-xl border border-border bg-muted/40 p-5">
                    <div className="self-start">
                        <p className="text-sm font-medium text-foreground">
                            Without motion design
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            State changes simply replace one another.
                        </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <StaticLoaderButton
                            state={withoutMotion.state}
                            onClick={withoutMotion.play}
                        />
                    </div>
                </div>

                <div className="flex min-h-48 flex-col items-center justify-center gap-6 rounded-xl border border-border bg-muted/40 p-5">
                    <div className="self-start">
                        <p className="text-sm font-medium text-foreground">
                            With Flow-Kit
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Motion connects and clarifies each state.
                        </p>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <LoaderButton
                            state={withMotion.state}
                            onClick={withMotion.play}
                            className="text-sm"
                        >
                            Submit
                        </LoaderButton>
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-0.5 text-center">
                <p className="text-xs font-medium text-foreground">
                    Click each button to compare the two approaches.
                </p>
            </div>
        </div>
    );
}

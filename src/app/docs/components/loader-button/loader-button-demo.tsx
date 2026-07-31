"use client";

import { useEffect, useState } from "react";
import { LoaderButton, type ButtonState } from "./loader-button";

export default function LoaderButtonDemo() {
    const [buttonState, setButtonState] = useState<ButtonState>("idle");
    const [simulateError, setSimulateError] = useState(false);

    const simulateHandleClick = (delay: number = 1500) => {
        setButtonState("loading");
        setTimeout(() => {
            if (simulateError) {
                setButtonState("error");
            } else {
                setButtonState("success");
            }
        }, delay);
    };

    useEffect(() => {
        if (buttonState === "error" || buttonState === "success") {
            const timer = setTimeout(() => {
                setButtonState("idle");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    return (
        <div className="flex flex-col min-h-[15rem] w-full items-center justify-center gap-8">
            <LoaderButton
                state={buttonState}
                onClick={() => simulateHandleClick(1500)}
            >
                Submit
            </LoaderButton>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                    type="checkbox"
                    id="error-toggle"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
                />
                <label htmlFor="error-toggle" className="cursor-pointer select-none">
                    Simulate Error State
                </label>
            </div>
        </div>
    );
}
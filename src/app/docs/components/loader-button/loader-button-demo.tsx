"use client";

import { useEffect, useState } from "react";
import { LoaderButton, type ButtonState } from "./loader-button";

export default function LoaderButtonDemo() {
    const [buttonState, setButtonState] = useState<ButtonState>("idle");

    const simulateHandleClick = (
        delay: number = 1500,
        shouldFail: boolean = false,
    ) => {
        setButtonState("loading");
        setTimeout(() => {
            if (shouldFail) {
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
        <div className="flex min-h-[10rem] w-full items-center justify-center">
            <LoaderButton
                state={buttonState}
                onClick={() => simulateHandleClick(3000, false)}
            >
                Submit
            </LoaderButton>
        </div>
    );
}

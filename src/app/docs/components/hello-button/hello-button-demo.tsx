"use client";

import { HelloButton } from "./hello-button";

export default function HelloButtonDemo() {
    return (
        <div className="flex min-h-[10rem] w-full items-center justify-center">
            <HelloButton>Say Hello</HelloButton>
        </div>
    );
}

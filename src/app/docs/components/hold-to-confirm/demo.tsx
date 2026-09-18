"use client";

import { useState } from "react";
import HoldToConfirm from "../../../../../registry/hold-to-confirm";
import { Delete } from "@/components/hugeicons";


export default function HoldToConfirmDemo() {
    const [actionState, setActionState] = useState<"idle" | "success">("idle");
    const [deleteCount, setDeleteCount] = useState(0);

    const handleConfirmDelete = () => {
        setActionState("success");
        setDeleteCount((prev) => prev + 1);

        setTimeout(() => {
            setActionState("idle");
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-8 font-sans border rounded-xl shadow-sm bg-white">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">
                    Hold to Confirm Demo
                </h2>
                <p className="text-gray-500 text-sm max-w-sm">
                    Press and hold the button or hold{" "}
                    <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-xs">
                        Space
                    </kbd>{" "}
                    /{" "}
                    <kbd className="px-1 py-0.5 bg-gray-100 border rounded text-xs">
                        Enter
                    </kbd>{" "}
                    to trigger the action. Let go early to cancel.
                </p>
            </div>

            <HoldToConfirm
                onConfirm={handleConfirmDelete}
                holdDuration={1500} // 1.5 seconds hold
            >
                <div className="flex items-center gap-2">
                    <Delete className="size-4" />
                    Hold to Delete
                </div>
            </HoldToConfirm>

            <div className="flex flex-col items-center gap-3">
                <div
                    className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                        actionState === "success"
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "bg-gray-100 text-gray-600"
                    }`}
                >
                    Status:{" "}
                    {actionState === "success"
                        ? "Action Confirmed!"
                        : "Waiting..."}
                </div>

                <p className="text-sm text-gray-400">
                    Items deleted:{" "}
                    <span className="font-mono font-bold text-gray-700">
                        {deleteCount}
                    </span>
                </p>
            </div>
        </div>
    );
}

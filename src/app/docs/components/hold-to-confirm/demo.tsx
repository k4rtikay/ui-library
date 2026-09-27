"use client";

import HoldToConfirm from "../../../../../registry/hold-to-confirm";
import { UploadCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function HoldToConfirmDemo() {
    const handleConfirmDelete = () => {
        toast.success("Your post is live.", {
            toasterId: "global",
        });
    };    

    return (
        <div className="flex flex-col items-center justify-center my-16">            
            <HoldToConfirm
                onConfirm={handleConfirmDelete}
                holdDuration={1200}
                className="bg-white dark:bg-neutral-700 shadow-sm"
                fillClassName={cn(
                    "text-blue-800 dark:text-blue-50",
                    "bg-gradient-to-b from-blue-50 via-blue-100/80 to-blue-200/90",
                    "dark:from-blue-700/65 dark:via-blue-800/60 dark:to-blue-900/50",
                    "[clip-path:inset(0_100%_0_0_round_999px)]",
                    "group-active:[clip-path:inset(0px_0px_0px_0px_round_999px)]",
                    "data-[holding]:[clip-path:inset(0px_0px_0px_0px_round_999px)]",
                )}
            >
                <div className="flex items-center gap-2 text-sm font-[510] tracking-wide">
                    <HugeiconsIcon
                        icon={UploadCircle01Icon}
                        className="size-5"
                    />
                    Hold To Post
                </div>
            </HoldToConfirm>
        </div>
    );
}

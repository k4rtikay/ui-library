"use client";

import { SlideToConfirm } from "../../../../../registry/slide-to-confirm";
import { Delete } from "@/components/hugeicons";
import { toast } from "@/components/ui/sonner";

export default function SlideToConfirmDemo() {
    return (
        <div className="my-16 flex flex-col gap-6 max-w-sm">
            <SlideToConfirm
                onConfirm={() =>
                    toast.success("Item deleted successfully", {
                        toasterId: "global",
                    })
                }
                handle={<Handle />}
            >
                Slide to delete
            </SlideToConfirm>
        </div>
    );
}

function Handle() {
    return (
        <span className="p-3 rounded-full bg-background dark:bg-neutral-700 text-foreground flex items-center justify-center gap-1 backdrop-blur-sm shadow-sm">
            <Delete className="size-4" />
        </span>
    );
}

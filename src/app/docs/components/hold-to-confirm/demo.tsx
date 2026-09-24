"use client";

import HoldToConfirm from "../../../../../registry/hold-to-confirm";
import { Delete } from "@/components/hugeicons";
import { toast } from "sonner";

export default function HoldToConfirmDemo() {
    const handleConfirmDelete = () => {
        toast.success("Item deleted successfully", {
            toasterId: "global",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center my-16">

            <HoldToConfirm
                onConfirm={handleConfirmDelete}
                holdDuration={1500}
                className="bg-white dark:bg-neutral-700 shadow-sm"
            >
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Delete className="size-4" />
                    Hold to Delete
                </div>
            </HoldToConfirm>
        </div>
    );
}

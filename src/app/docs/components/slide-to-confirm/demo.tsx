"use client";

import { SlideToConfirm, SlideHandle } from "../../../../../registry/slide-to-confirm";
import { Delete } from "@/components/hugeicons";

export default function SlideToConfirmDemo() {
    return (
        <div className="p-8 flex flex-col gap-6 max-w-sm">
            <SlideToConfirm
                onConfirm={() => console.log("confirmed: delete item")}
                handle={
                    <SlideHandle>
                        <Delete className="size-4" />
                    </SlideHandle>
                }
            >
                Slide to delete
            </SlideToConfirm>
        </div>
    );
}
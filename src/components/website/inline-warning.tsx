import type { ComponentProps } from "react";
import { ExclamationMarkBig } from "@/components/hugeicons";
import { cn } from "@/lib/utils";

export function InlineWarning({
    className,
    children,
    ...props
}: ComponentProps<"div">) {
    return (
        <div
            role="note"
            data-slot="inline-warning"
            className={cn(
                "mt-2 flex w-full items-center gap-2 px-2 py-1 text-xs text-balance tracking-wide text-muted-foreground [&_p]:m-0",
                className,
            )}
            {...props}
        >
            <span className="bg-muted rounded-full">
                <ExclamationMarkBig aria-hidden="true" className="size-4" />
            </span>
            {children}
        </div>
    );
}

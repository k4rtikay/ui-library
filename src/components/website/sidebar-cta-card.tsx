import { Button } from "../ui/button";
import { Github } from "lucide-react";

export default function SidebarCtaCard() {
    return (
        <div className="relative isolate aspect-4/3 p-4 flex flex-col items-center justify-center gap-6 bg-background shadow-sm rounded-xl">
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
                <div className="absolute -bottom-[65%] left-1/2 h-[115%] w-[125%] -translate-x-1/2 rounded-[50%] bg-[#F97316]/25 blur-3xl" />
                <div className="absolute -bottom-[55%] left-1/2 h-[90%] w-[85%] -translate-x-1/2 rounded-[50%] bg-background blur-3xl" />
                <div
                    className="
                absolute inset-0
                bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_1px)]
                bg-[size:12px_12px]
                text-foreground/[0.07]
              "
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 text-center text-balance">
                <p className="text-base font-semibold">Like what you see?</p>
                <p className="text-xs">
                    Star Flow-Kit and follow its progress.
                </p>
            </div>
            <Button
                variant="default"
                size="sm"
                className="gap-0 bg-zinc-900 dark:bg-zinc-900 text-white dark:text-white shadow-sm inset-shadow-sm inset-shadow-white/10 dark:hover:bg-zinc-900/90 cursor-pointer"
            >
                <Github className="size-3.5" />
                <span className="text-xs font-mono">/flow-kit</span>
            </Button>
        </div>
    );
}

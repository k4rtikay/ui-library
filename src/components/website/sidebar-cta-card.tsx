import { Button } from "../ui/button";
import { Github } from "@/components/hugeicons";
import Image from "next/image";

export default function SidebarCtaCard() {
    return (
        <div className="relative isolate aspect-4/3 p-4 flex flex-col items-center justify-center gap-6 bg-background shadow-sm rounded-xl overflow-hidden">
            <div className="flex flex-col items-center justify-center gap-1 text-center text-balance">
                <p className="text-base font-semibold text-shadow-sm">
                    Like what you see?
                </p>
                <p className="text-xs text-shadow-sm">
                    Star Flow-Kit and follow its progress.
                </p>
            </div>
            <Image
                src="/waves-sidebar-cta.png"
                alt="background illustration of orange tiles against a light background"
                fill
                className="object-cover -z-10 dark:hidden opacity-70"
                aria-hidden="true"
            />
            <Image
                src="/waves-sidebar-cta.png"
                alt="background illustration of orange tiles against a dark background"
                fill
                className="hidden object-cover dark:block -z-10 opacity-30"
                aria-hidden="true"
            />
            <Button
                asChild
                variant="default"
                size="sm"
                className="gap-0 bg-zinc-900 hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-900 text-white dark:text-white shadow-sm inset-shadow-sm inset-shadow-white/10 hover:opacity-80 cursor-pointer"
            >
                <a href="https://www.github.com/k4rtikay/ui-library" target="_blank" rel="noopner noreferrer">
                    {" "}
                    <Github className="size-3.5" />
                    <span className="text-xs font-mono">/flow-kit</span>
                </a>
            </Button>
        </div>
    );
}

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/website/mode-toggle";
import MobileNav from "@/components/website/mobile-nav";
import { SpotlightTrigger } from "@/components/website/spotlight-trigger";
import { Github, Sidebar } from "lucide-react";
import { Button } from "../ui/button";

export default function DocsHeader() {
    return (
        <header className="sticky w-full z-50 top-8 p-2 my-4 overflow-hidden flex justify-between items-center">
            <div className="flex items-center gap-4">
                <MobileNav />
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-md dark:shadow-(--elevation-md)"
                >
                    <Sidebar />
                </Button>
                <Link href="/" className="flex items-center rounded-full">
                    <Image
                        src="/waves-blue.png"
                        alt="Flow Kit Logo"
                        width={32}
                        height={32}
                        className="size-8 shrink-0 rounded-full object-cover h-9 w-9"
                    />
                </Link> 
            </div>
            <div className="flex items-center gap-4">
                <SpotlightTrigger />
                <ModeToggle />
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-md dark:shadow-(--elevation-md)"
                    asChild
                >
                    <Link
                        href="https://github.com/k4rtikay/ui-library"
                        className="flex items-center"
                    >
                        <Github size={16} />
                    </Link>
                </Button>
            </div>
        </header>
    );
}

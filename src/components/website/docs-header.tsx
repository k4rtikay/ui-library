import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/website/mode-toggle";
import MobileNav from "@/components/website/mobile-nav";
import { SpotlightTrigger } from "@/components/website/spotlight-trigger";
import { Github } from "lucide-react";

export default function DocsHeader() {
    return (
        <header className="sticky backdrop-blur-md z-50 top-4 w-full bg-card/70 border-border border-2 rounded-xl shadow-sm max-w-1/2 mx-auto my-8">
            <div className="flex items-center justify-between px-4 py-1 text-sm">
                <div className="flex items-center gap-6">
                    {/*<MobileNav />*/}
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                    >
                        <Image
                            src="/flow-kit-icon.png"
                            alt="Flow Kit Logo"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <SpotlightTrigger />
                    <ModeToggle />
                    <Link
                        href="https://github.com/flow-kit/ui-library"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <Github size={16} />
                    </Link>
                </div>
            </div>  
        </header>
    );
}

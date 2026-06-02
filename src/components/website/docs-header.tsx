"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/website/mode-toggle";
import MobileNav from "@/components/website/mobile-nav";

export default function DocsHeader() {
    const pathname = usePathname();

    const navItems = [
        { href: "/docs", label: "Docs" },
        { href: "/playground", label: "Playground" },
    ];

    return (
        <header className="sticky backdrop-blur-md z-50 top-4 w-full bg-card/70 border-border border-2 rounded-full shadow-sm max-w-1/2 mx-auto my-8 overflow-hidden">
            <div className="flex items-center justify-between px-8 py-2 text-sm">
                <div className="flex items-center gap-6">
                    <MobileNav />
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/flow-kit-icon.png"
                            alt="Flow Kit Logo"
                            width={24}
                            height={24}
                        />
                        <span className="font-semibold">
                            Flow Kit
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-[50px] [corner-shape:squircle] transition-all duration-200
                                             ${isActive
                                        ? "text-forground font-medium"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}

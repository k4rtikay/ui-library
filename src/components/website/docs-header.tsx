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
        <header className="sticky top-0 w-full z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between px-6 h-16">
                <div className="flex items-center gap-6">
                    <MobileNav />
                    <Link
                        href="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/flow-kit-icon.png"
                            alt="Flow Kit Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-lg font-bold bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent">
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
                                    className={`px-4 py-2 rounded-[50px] [corner-shape:squircle] font-medium text-sm transition-all duration-200
                                             ${isActive
                                        ? "bg-linear-to-r from-[#2c2c2c] to-zinc-700 text-white shadow-md"
                                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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

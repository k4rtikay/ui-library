"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavRoutes() {
    const pathname = usePathname();

    const comps = [
        {
            category: "Getting Started",
            items: [
                { name: "Introduction", href: "/docs" },
                { name: "Setup", href: "/docs/setup" },
            ],
        },
        {
            category: "Buttons",
            items: [
                { name: "Loader Button", href: "/docs/components/loader-button" },
                { name: "Hello Button", href: "/docs/components/hello-button" },
            ],
        },
        {
            category: "Cards",
            items: [
                { name: "Card Stack", href: "/docs/components/card-stack" },
            ],
        },
        {
            category: "Menus",
            items: [
                { name: "Shared Menu", href: "/docs/components/shared-menu" },
            ],
        },
        {
            category: "Animations",
            items: [
                { name: "Stagger Reveal", href: "/docs/components/stagger-reveal" },
            ],
        },
    ];

    return (
        <ul className="flex flex-col gap-4">
            {comps.map((comp) => (
                <li key={comp.category} className="flex flex-col gap-1">
                    <p className="font-bold text-xs text-zinc-500 dark:text-zinc-100 uppercase tracking-wider pb-2">
                        {comp.category}
                    </p>
                    <ul className="flex flex-col gap-1 w-[94%] mx-auto border-l border-l-zinc-500 relative">
                        {comp.items.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.name} className="relative">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-r-[15px] [corner-shape:squircle]",
                                            {
                                                "bg-linear-to-r from-zinc-200 to-zinc-300 text-zinc-900 dark:from-[#171717] dark:to-zinc-700 dark:text-white":
                                                    isActive,
                                                "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800":
                                                    !isActive,
                                            }
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
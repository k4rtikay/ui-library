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
                {
                    name: "Introduction",
                    href: "/docs",
                },
                {
                    name: "Setup",
                    href: "/docs/setup",
                },
            ],
        },
        {
            category: "Buttons",
            items: [
                {
                    name: "Loader Button",
                    href: "/docs/components/loader-button",
                },
            ],
        },
        {
            category: "Cards",
            items: [
                {
                    name: "Card Stack",
                    href: "/docs/components/card-stack",
                },
            ],
        },
        {
            category: "Animations",
            items: [
                {
                    name: "Stagger Reveal",
                    href: "/docs/components/stagger-reveal",
                },
            ],
        },
    ];

    return (
        <ul className="flex flex-col gap-8">
            {comps.map((comp) => {
                return (
                    <li key={comp.category} className="flex flex-col gap-4">
                        <p className="font-semibold text-md">{comp.category}</p>
                        <ul className="flex flex-col gap-2 border-l-2 border-l-[#C2C2C2] dark:border-l-[#525252] px-4">
                            {comp.items.map((item) => {
                                return (
                                    <li
                                        key={item.name}
                                        className={cn(
                                            "opacity-60 hover:opacity-100",
                                            {
                                                "text-[#698BFA] opacity-100 font-semibold":
                                                    pathname === item.href,
                                            },
                                        )}
                                    >
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

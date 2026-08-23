"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { docsNavigation } from "@/lib/paths";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function NavRoutes() {
    const pathname = usePathname();

    return (
        <nav aria-label="Documentation navigation">
            <Accordion
                type="multiple"
                defaultValue={docsNavigation.map((category) => category.id)}
                className="flex flex-col gap-2"
            >
                {docsNavigation.map((category) => {
                    const Icon = category.icon;

                    return (
                        <AccordionItem
                            key={category.id}
                            value={category.id}
                            className="border-b-0"
                        >
                            <AccordionTrigger className="rounded-lg p-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:no-underline hover:text-sidebar-foreground dark:hover:bg-sidebar-accent">
                                <span className="flex items-center gap-2">
                                    <Icon className="size-4" />
                                    {category.title}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="mx-1 -my-2 px-2 py-2 pb-2">
                                <ul className="mt-1 flex flex-col border-l border-border pl-2">
                                    {category.items.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "relative mb-1 block rounded-lg p-2 text-sm font-medium text-muted-foreground hover:text-sidebar-foreground dark:hover:bg-sidebar-accent transition-colors duration-200",
                                                        isActive &&
                                                            "text-sidebar-primary-foreground text-shadow-sm bg-sidebar-primary hover:text-sidebar-primary-foreground dark:hover:bg-sidebar-primary shadow-sm inset-shadow-sm inset-shadow-white/20",
                                                    )}
                                                >
                                                    <span className="relative">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </nav>
    );
}

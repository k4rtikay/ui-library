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
                            <AccordionTrigger className="rounded-md py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:no-underline hover:bg-foreground/5">
                                <span className="flex items-center gap-2">
                                    <Icon className="size-4" />
                                    {category.title}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <ul className="mt-1 flex flex-col gap-1 border-l border-border pl-2">
                                    {category.items.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "relative block overflow-hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 before:absolute before:inset-0 before:bg-foreground before:opacity-0 before:transition-opacity hover:before:opacity-5",
                                                        isActive &&
                                                            "text-foreground before:opacity-10 hover:before:opacity-10",
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

"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { paths } from "@/lib/paths";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function NavRoutes() {
    const pathname = usePathname();
    const pathsByCategory = paths.reduce<
        Array<{ category: string; items: typeof paths }>
    >((categories, path) => {
        const category = categories.find(
            (group) => group.category === path.category,
        );

        if (category) {
            category.items.push(path);
        } else {
            categories.push({ category: path.category, items: [path] });
        }

        return categories;
    }, []);

    return (
        <nav aria-label="Documentation navigation">
            <Accordion
                type="multiple"
                defaultValue={pathsByCategory.map((category) => category.category)}
                className="flex flex-col gap-2"
            >
                {pathsByCategory.map((category) => (
                    <AccordionItem
                        key={category.category}
                        value={category.category}
                        className="border-b-0"
                    >
                        <AccordionTrigger className="rounded-md px-2 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:no-underline hover:bg-foreground/5">
                            {category.category}
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
                ))}
            </Accordion>
        </nav>
    );
}

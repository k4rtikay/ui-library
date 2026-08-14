"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { paths } from "@/lib/paths";

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
        <ul className="flex flex-col gap-4">
            {pathsByCategory.map((category) => (
                <li key={category.category} className="flex flex-col gap-1">
                    <p className="pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-100">
                        {category.category}
                    </p>
                    <ul className="relative mx-auto flex w-[94%] flex-col gap-1 border-l border-l-zinc-500">
                        {category.items.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href} className="relative">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "block rounded-r-[15px] px-3 py-2 text-sm font-medium transition-colors duration-200 [corner-shape:squircle]",
                                            {
                                                "bg-linear-to-r from-zinc-200 to-zinc-300 text-zinc-900 dark:from-[#171717] dark:to-zinc-700 dark:text-white":
                                                    isActive,
                                                "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800":
                                                    !isActive,
                                            },
                                        )}
                                    >
                                        {item.title}
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

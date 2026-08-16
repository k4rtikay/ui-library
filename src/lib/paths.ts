import type { LucideIcon } from "lucide-react";
import { MousePointerClick, PanelsTopLeft, Rocket, Rows } from "lucide-react";

export type RouteItem = {
    title: string;
    href: string;
    category: string;
};

type DocsNavItem = Omit<RouteItem, "category">;

export type DocsNavCategory = {
    id: string;
    title: string;
    icon: LucideIcon;
    items: DocsNavItem[];
};

export const docsNavigation: DocsNavCategory[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: Rocket,
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Setup", href: "/docs/setup" },
        ],
    },
    {
        id: "buttons",
        title: "Buttons",
        icon: MousePointerClick,
        items: [
            {
                title: "Loader Button",
                href: "/docs/components/loader-button",
            },
        ],
    },
    {
        id: "cards",
        title: "Cards",
        icon: PanelsTopLeft,
        items: [
            {
                title: "Card Stack",
                href: "/docs/components/card-stack",
            },
        ],
    },
    {
        id: "animations",
        title: "Lists",
        icon: Rows,
        items: [
            {
                title: "Pinned List",
                href: "/docs/components/pinned-list",
            },
        ],
    },
];

export const paths: RouteItem[] = docsNavigation.flatMap((category) =>
    category.items.map((item) => ({
        ...item,
        category: category.title,
    })),
);

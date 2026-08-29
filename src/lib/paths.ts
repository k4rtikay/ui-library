import type { HugeIcon } from "@/components/hugeicons";
import { MousePointerClick, PanelsTopLeft, Rocket, Rows } from "@/components/hugeicons";

export type RouteItem = {
    title: string;
    href: string;
    category: string;
};

type DocsNavItem = Omit<RouteItem, "category">;

export type DocsNavCategory = {
    id: string;
    title: string;
    icon: HugeIcon;
    items: DocsNavItem[];
};

export const docsNavigation: DocsNavCategory[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: Rocket,
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/installation" },
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

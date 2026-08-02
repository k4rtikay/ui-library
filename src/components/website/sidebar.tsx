"use client";

// import { usePathname } from "next/navigation";
import NavRoutes from "./nav-routes";

export function Sidebar() {
    // const pathname = usePathname();

    // const comps = [
    //     {
    //         category: "Getting Started",
    //         items: [
    //             {
    //                 name: "Introduction",
    //                 href: "/docs",
    //             },
    //             {
    //                 name: "Setup",
    //                 href: "/docs/setup",
    //             },
    //         ],
    //     },
    //     {
    //         category: "Buttons",
    //         items: [
    //             {
    //                 name: "Expanding Pill",
    //                 href: "/docs/components/expanding-pill",
    //             },
    //         ],
    //     },
    //     {
    //         category: "Cards",
    //         items: [
    //             {
    //                 name: "Card Stack",
    //                 href: "/docs/components/card-stack",
    //             },
    //             {
    //                 name: "Lenticular Card",
    //                 href: "/docs/components/lenticular-card",
    //             },
    //             {
    //                 name: "FAQ Section",
    //                 href: "/docs/components/faq-section",
    //             },
    //         ],
    //     },
    //     {
    //         category: "Interactive",
    //         items: [
    //             {
    //                 name: "Drag and Drop Accordion",
    //                 href: "/docs/components/dnd-accordion",
    //             },
    //         ],
    //     },
    // ];

    return (
        <aside
            className=" sticky top-[58px] h-[calc(100vh-56px)] hidden md:block w-64 shrink-0 border-r-2 overflow-y-auto px-4 pt-8 pb-16 text-sm
        "
        >
            <NavRoutes />
        </aside>
    );
}

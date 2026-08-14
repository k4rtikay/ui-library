"use client";

// import { usePathname } from "next/navigation";
import NavRoutes from "./nav-routes";

export function Sidebar() {
    return (
        <aside
            className="hidden h-dvh w-64 shrink-0 self-start border-r-2 px-4 py-4 text-sm md:sticky md:top-0 md:flex md:flex-col md:gap-8"
        >
            <h1 className="text-3xl font-semibold">Flow-Kit</h1>
            <NavRoutes />
        </aside>
    );
}

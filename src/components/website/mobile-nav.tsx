"use client";

import { useState } from "react";
import { Sidebar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import NavRoutes from "./nav-routes";

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="md:hidden rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-md dark:shadow-(--elevation-md)"
                        size={"icon"}
                    >
                        <Sidebar />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="mt-8 px-2">
                        {/* Reuse the links here! */}
                        <NavRoutes />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

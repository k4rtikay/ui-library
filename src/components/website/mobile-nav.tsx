"use client";

import Image from "next/image";
import { useState } from "react";
import { Sidebar } from "@/components/hugeicons";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from "../ui/sheet";
import { Button } from "../ui/button";
import NavRoutes from "./nav-routes";
import { Box, Github } from "@/components/hugeicons";

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
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2 text-xl">
                            <Image
                                src="/icon.png"
                                alt="Flow-Kit logo"
                                width={28}
                                height={28}
                                className="size-7 shrink-0"
                            />
                            <span>Flow-Kit</span>
                        </SheetTitle>
                        <div className="mt-1 w-full flex items-center gap-2 font-mono text-base text-muted-foreground">
                            <Box className="size-4" />
                            <span>
                                v0.1.0{" "}
                                    <span className="text-sm bg-accent text-accent-foreground rounded-full border-1 border-border py-1 px-2">
                                        Beta
                                    </span>
                                </span>
                            </div>
                    </SheetHeader>
                    <div className="px-2 -mt-2">
                        <NavRoutes />
                    </div>
                    <SheetFooter className="bg-sidebar border-t border-border py-4 px-2 ">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <span className="text-sm font-medium">Show support by starring us on Github.</span>
                            <Button variant="default" className="bg-primary w-fit" asChild>
                                <a href="https://github.com/flowkit-dev/ui-library">
                                  <span><Github className="size-4 inline-block font-mono" /> / flow-kit</span>
                                </a>
                            </Button>
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}

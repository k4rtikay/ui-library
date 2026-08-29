import type { RefObject } from "react";
import { ModeToggle } from "@/components/website/mode-toggle";
import MobileNav from "@/components/website/mobile-nav";
import { SpotlightTrigger } from "@/components/website/spotlight-trigger";
import { Github, Sidebar } from "@/components/hugeicons";
import { Button } from "../ui/button";
import { ScrollProgressPill } from "./scroll-progress-pill";


interface DocsHeaderProps {
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
    scrollContainer: RefObject<HTMLElement | null>;
    scrollContainerElement: HTMLElement | null;
}

const docsSections = [
  { id: "introduction", label: "Introduction" },
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
  { id: "api-reference", label: "API Reference" },
];

export default function DocsHeader({
    isSidebarCollapsed,
    onToggleSidebar,
    scrollContainer,
    scrollContainerElement,
}: DocsHeaderProps) {
    return (
      <header className="absolute inset-x-0 top-0 z-40 flex w-full items-center justify-between px-4 pt-8 pb-12 md:px-8">
            <div className="flex items-center gap-4">
                <MobileNav /> 
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden md:inline-flex rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-md dark:shadow-(--elevation-md)"
                    aria-controls="docs-sidebar"
                    aria-expanded={!isSidebarCollapsed}
                    aria-label={
                        isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                    onClick={onToggleSidebar}
                >
                    <Sidebar />
                </Button>
                
                <ScrollProgressPill
                    sections={docsSections}
                    scrollContainer={scrollContainer}
                    scrollContainerElement={scrollContainerElement}
                />
                
            </div>
            <div className="flex items-center gap-4">
                <SpotlightTrigger />
                <ModeToggle />
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground shadow-md dark:shadow-(--elevation-md)"
                    asChild
                >
                    <a
                        href="https://github.com/k4rtikay/ui-library"
                        target="_blank"
                        rel="noopen noreferrer"
                        className="flex items-center"
                    >
                        <Github size={16} />
                    </a>
                </Button>
            </div>
            
        </header>
    );
}

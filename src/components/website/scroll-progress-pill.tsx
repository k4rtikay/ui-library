"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useScroll } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Section = {
  id: string;
  label: string;
};

const SCROLL_OFFSET = 112;

export function ScrollProgressPill({
  sections,
  scrollContainer,
  scrollContainerElement,
}: {
  sections: Section[];
  scrollContainer?: RefObject<HTMLElement | null>;
  scrollContainerElement?: HTMLElement | null;
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll({ container: scrollContainer });

  useEffect(() => {
    const sectionElements = sections.flatMap((section) => {
      const element = document.getElementById(section.id);
      return element ? [{ id: section.id, element }] : [];
    });

    if (sectionElements.length === 0) return;

    const updateActiveSection = () => {
      const container = scrollContainerElement;
      const activationLine =
        (container?.getBoundingClientRect().top ?? 0) + SCROLL_OFFSET;
      const currentSection = sectionElements.reduce(
        (current, section) =>
          section.element.getBoundingClientRect().top <= activationLine
            ? section
            : current,
        sectionElements[0],
      );

      setActiveSection(currentSection.id);
    };

    const scrollingElement = scrollContainerElement ?? window;

    updateActiveSection();
    scrollingElement.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      scrollingElement.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [scrollContainerElement, sections]);

  const activeLabel =
    sections.find((section) => section.id === activeSection)?.label ?? "Scroll";

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setIsOpen(false);
    const container = scrollContainerElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      container.scrollTo({
        top: Math.max(
          0,
          container.scrollTop +
            elementRect.top -
            containerRect.top -
            SCROLL_OFFSET,
        ),
        behavior: "smooth",
      });
      return;
    }

    window.scrollTo({
      top: Math.max(
        0,
        element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
      ),
      behavior: "smooth",
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group relative hidden h-9 items-center gap-2 rounded-xl border border-border bg-secondary px-3 text-xs font-[520] tracking-tight text-secondary-foreground shadow-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:flex dark:shadow-(--elevation-md)"
        >
          <span className="relative flex size-4 shrink-0 items-center justify-center">
            <svg
              className="absolute inset-0 size-full -rotate-90"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                className="fill-none stroke-muted-foreground/30"
                strokeWidth="12"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                className="fill-none stroke-primary"
                strokeWidth="12"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          </span>

          <span className="w-20 truncate text-left">{activeLabel}</span>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-muted-foreground transition-colors group-hover:text-foreground p-0.5 rounded-full border border-border bg-background"
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
          </motion.span>
        </button>
      </PopoverTrigger>

      <PopoverContent side="bottom" align="start" className="not-prose bg-secondary rounded-xl">
        <div className="flex flex-col gap-0.5">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleScrollTo(section.id)}
                aria-current={isActive ? "location" : undefined}
                className="flex w-full items-center rounded-lg px-3 py-2 text-left text-xs font-[520] text-muted-foreground transition-colors hover:bg-sidebar dark:hover:bg-muted-foreground/20 hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
              >
                <span
                  className={
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CodeStepsProps {
    children: ReactNode;
    className?: string;
}

export function CodeSteps({ children, className }: CodeStepsProps) {
    return (
        <ol
            className={cn(
                "list-none space-y-6 p-6 [counter-reset:step]",
                className,
            )}
        >
            {children}
        </ol>
    );
}

interface CodeStepProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export function CodeStep({
    title,
    description,
    children,
    className,
}: CodeStepProps) {
    return (
        <li
            className={cn(
                "relative pl-12 [counter-increment:step]",
                "before:absolute before:left-0 before:top-0 before:flex before:size-8 before:items-center before:justify-center before:rounded-full before:border before:border-border before:bg-accent before:font-mono before:text-xs before:font-medium before:text-accent-foreground before:content-[counter(step)]",
                "after:absolute after:-bottom-6 after:left-4 after:top-8 after:w-px after:bg-border last:after:hidden",
                className,
            )}
        >
            <h3 className="font-mono text-sm font-medium text-foreground">
                {title}
            </h3>
            {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                </p>
            )}
            <div className="mt-4 w-full overflow-hidden rounded-2xl border">
                {children}
            </div>
        </li>
    );
}

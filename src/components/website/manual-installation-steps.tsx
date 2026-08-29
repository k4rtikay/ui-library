import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ManualInstallationStepsProps {
    children: ReactNode;
    className?: string;
}

const steps = [
    {
        title: "Copy the component code",
        description: "Copy the complete code block below.",
    },
    {
        title: "Create a component file",
        description:
            "Create a new .tsx file in the appropriate directory of your project.",
    },
    {
        title: "Paste the code",
        description: "Paste the copied component code into the new file.",
    },
    {
        title: "Resolve imports",
        description:
            "Update import paths and install any dependencies required by the component.",
    },
];

export default function ManualInstallationSteps({
    children,
    className,
}: ManualInstallationStepsProps) {
    return (
        <ol className={cn("space-y-6 list-none", className)}>
            {steps.map((step, index) => (
                <li
                    key={step.title}
                    className="relative pl-12 after:absolute after:-bottom-6 after:left-4 after:top-8 after:w-px after:bg-border last:after:hidden"
                >
                    <span
                        className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border bg-accent font-mono text-xs font-medium text-accent-foreground"
                        aria-hidden="true"
                    >
                        {index + 1}
                    </span>
                    <h3 className="font-medium text-foreground">
                        {step.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                        {step.description}
                    </p>
                    {index === 0 && (
                        <div className="not-prose mt-4 w-full overflow-hidden rounded-2xl border">
                            {children}
                        </div>
                    )}
                </li>
            ))}
        </ol>
    );
}

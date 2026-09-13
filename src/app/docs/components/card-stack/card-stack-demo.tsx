import { cn } from "@/lib/utils";
import { CardStack } from "../../../../../registry/card-stack";
import { Button } from "@/components/ui/button";

export default function CardStackDemo() {
    return (
        <div className="flex flex-col min-h-[10rem] w-full items-center justify-center">
            <CardStack>
                {AI_PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        className={cn(
                            "h-full w-full max-w-xs rounded-2xl border-px border-border bg-card dark:shadow-muted",
                            "p-5 shadow-sm dark:shadow-muted",
                        )}
                    >
                        <div className="flex h-full flex-col gap-2">
                            <p className="text-sm font-semibold text-foreground">
                                {plan.header}
                            </p>

                            <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                                {plan.description}
                            </p>

                            <Button className="mt-auto text-sm font-semibold bg-linear-to-b from-neutral-700 to-foreground text-background rounded-md hover:bg-foreground/90 dark:hover:bg-foreground/90">
                                {plan.ctaText}
                            </Button>
                        </div>
                    </div>
                ))}
            </CardStack>
        </div>
    );
}

// --- Data & Assets ---

const AI_PLANS = [
    {
        id: 1,
        header: "25% off our latest model",
        description:
            "Get 25% off usage of our newest reasoning model for the next 30 days. Built for complex tasks, coding, and long-context workflows.",
        ctaText: "Try the new model",
    },
    {
        id: 2,
        header: "Free observability for 90 days",
        description:
            "Monitor every request with traces, latency, token usage, and model performance. No instrumentation fee for your first 90 days.",
        ctaText: "Enable observability",
    },
    {
        id: 3,
        header: "2M free API tokens",
        description:
            "Build and test your next AI feature with 2 million tokens included on every new developer account.",
        ctaText: "Start building",
    },
    {
        id: 4,
        header: "Ship agents for less",
        description:
            "Save 30% on agent runs this month. Includes tool calling, web search, structured outputs, and persistent task execution.",
        ctaText: "Build an agent",
    },
    {
        id: 5,
        header: "Scale without the cold start",
        description:
            "Priority inference and dedicated capacity for production workloads. Get predictable latency when your traffic spikes.",
        ctaText: "Explore Scale",
    },
];
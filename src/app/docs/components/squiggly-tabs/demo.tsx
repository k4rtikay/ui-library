import { Indie_Flower } from "next/font/google";

import { Button } from "@/components/ui/button";
import {
    SquiggleTabs,
    SquiggleTabsContent,
    SquiggleTabsList,
    SquiggleTabsTrigger,
} from "../../../../../registry/squiggly-tabs";
import { Flower } from "./flower";

const indieFlower = Indie_Flower({
    subsets: ["latin"],
    weight: ["400"],
});

const tabs = [
    {
        value: "models",
        label: "Models",
        description: "Pick from frontier and open-source models behind one API.",
        cta: "Browse models",
        color: "#f472b6",
    },
    {
        value: "agents",
        label: "Agents",
        description: "Spin up agents that plan, reason, and get things done.",
        cta: "Build an agent",
        color: "#fbbf24",
    },
    {
        value: "workflows",
        label: "Workflows",
        description: "Chain steps into reliable, repeatable pipelines.",
        cta: "Create a workflow",
        color: "#60a5fa",
    },
    {
        value: "tools",
        label: "Tools",
        description: "Give your agents hands: search, code, files, and APIs.",
        cta: "Explore tools",
        color: "#4ade80",
    },
];

const tabColors = Object.fromEntries(tabs.map((tab) => [tab.value, tab.color]));

export function Demo() {
    return (
        <div className="w-full max-w-2xl">
            <SquiggleTabs defaultValue="models" className="gap-4">
                <SquiggleTabsList>
                    {tabs.map((tab) => (
                        <SquiggleTabsTrigger
                            key={tab.value}
                            value={tab.value}
                            squiggleColor={tab.color}
                        >
                            {tab.label}
                        </SquiggleTabsTrigger>
                    ))}
                </SquiggleTabsList>

                <div className="flex min-h-64 flex-col items-center gap-4 overflow-hidden rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-sm sm:flex-row">
                    <div className="w-full flex-1">
                        {tabs.map((tab) => (
                            <SquiggleTabsContent
                                key={tab.value}
                                value={tab.value}
                            >
                                <div className="flex flex-col items-start gap-2">
                                    <h3
                                        className={`text-3xl font-semibold ${indieFlower.className}`}
                                    >
                                        {tab.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {tab.description}
                                    </p>
                                    <Button className="rounded-full mt-2">
                                        {tab.cta} <span aria-hidden>→</span>
                                    </Button>
                                </div>
                            </SquiggleTabsContent>
                        ))}
                    </div>

                    <div className="flex h-56 w-full max-w-48 shrink-0 items-center justify-center">
                        <Flower colors={tabColors} />
                    </div>
                </div>
            </SquiggleTabs>
        </div>
    );
}

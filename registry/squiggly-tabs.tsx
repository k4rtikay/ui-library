import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const squiggle =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath d='M0 3 Q3 0 6 3 T12 3' fill='none' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E\")";

export function SquiggleTrigger({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) {
    return (
        <TabsTrigger
            value={value}
            className="group relative after:hidden data-[state=active]:after:hidden"
        >
            {children}

            <span
                className="pointer-events-none absolute inset-x-0 -bottom-1 h-[6px] bg-current
                opacity-0 group-data-[state=active]:opacity-100
                [clip-path:inset(0_100%_0_0)]
                group-data-[state=active]:[clip-path:inset(0_0_0_0)]
                transition-all duration-300 ease-out"
                style={{
                    maskImage: squiggle,
                    WebkitMaskImage: squiggle,
                    maskRepeat: "repeat-x",
                    WebkitMaskRepeat: "repeat-x",
                }}
            ></span>
        </TabsTrigger>
    );
}

export function TabsSquiggle() {
    return (
        <Tabs defaultValue="overview">
            <TabsList variant="line">
                <SquiggleTrigger value="overview">Overview</SquiggleTrigger>
                <SquiggleTrigger value="analytics">Analytics</SquiggleTrigger>
                <SquiggleTrigger value="reports">Reports</SquiggleTrigger>
            </TabsList>
        </Tabs>
    );
}

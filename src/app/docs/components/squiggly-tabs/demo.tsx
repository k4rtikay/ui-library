import {
    SquiggleTabs,
    SquiggleTabsContent,
    SquiggleTabsList,
    SquiggleTabsTrigger,
} from "../../../../../registry/squiggly-tabs";

const tabs = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "profile", label: "Profile" },
    { value: "settings", label: "Settings" },
];

export function Demo() {
    return (
        <div>
            <SquiggleTabs defaultValue="overview">
                <SquiggleTabsList variant="line">
                    {tabs.map((tab) => (
                        <SquiggleTabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </SquiggleTabsTrigger>
                    ))}
                </SquiggleTabsList>
                {tabs.map((tab) => (
                    <SquiggleTabsContent key={tab.value} value={tab.value}>
                        {tab.label} content
                    </SquiggleTabsContent>
                ))}
            </SquiggleTabs>
        </div>
    );
}

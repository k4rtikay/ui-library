import { ModeToggle } from "@/components/website/mode-toggle";

export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="w-full flex items-center justify-between py-1 px-2">
                <h1 className="font-semibold">Flow-Kit</h1>
                <ModeToggle />
            </header>

            <div className="m-4">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Component Playground</h1>
                <p className="text-muted-foreground mt-2">
                    Use this area to develop and test components in isolation.
                </p>
            </div>

            <div className="min-h-screen w-full bg-background text-foreground p-8 font-sans">
                {children}
            </div>
        </>
    );
}
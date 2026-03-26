import PinnedListDemo from "../docs/components/pinned-list/pinned-list-demo";
import SharedMenuDemo from "../docs/components/shared-menu/shared-menu-demo";

export default function DevRun() {
    return (
        <div className="w-full bg-background">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1600px] mx-auto">
                <section className="w-full lg:w-[70%] space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl text-foreground">Preview</h2>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>Responsive Container</span>
                        </div>
                    </div>

                    <div className="border border-border rounded-xl overflow-hidden bg-background backdrop-blur-sm relative h-[600px] flex flex-col">
                        <div className="w-full h-10 bg-background border-b border-border flex items-center px-4 justify-between shrink-0">
                            <div className="flex items-center gap-1.5 min-w-[50px]">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>

                            <div className="flex-1 max-w-[400px] px-4">
                                <div className="w-full h-7 bg-muted/30 border border-border rounded-md px-3 flex items-center justify-center gap-2 group transition-colors hover:bg-muted/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                    <span className="text-[10px] text-muted-foreground font-medium truncate">flow-kit.ui/playground</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 min-w-[50px] justify-end">
                                <div className="w-4 h-4 rounded-sm border-transparent"></div>
                            </div>
                        </div>

                        <div className="flex-1 p-8 flex items-center justify-center relative bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[16px_16px] overflow-auto">
                            {/* NOTE: Import and place your component here for testing */}
                            <div className="flex items-center justify-center">
                                {/* <p className="text-muted-foreground text-sm">
                                    Import a component into{" "}
                                    <code className="text-foreground">
                                        src/app/playground/page.tsx
                                    </code>{" "}
                                    to start.
                                </p> */}
                                {/* <PinnedListDemo /> */}
                                {/* <SharedMenuDemo /> */}
                                <PinnedListDemo />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full lg:w-[30%] space-y-4">
                    <h2 className="text-xl text-foreground">Controls</h2>
                    <div className="p-6 border border-border rounded-xl bg-background h-[600px]">
                        <p className="text-muted-foreground">
                            Add props controls or documentation notes here as
                            you build.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

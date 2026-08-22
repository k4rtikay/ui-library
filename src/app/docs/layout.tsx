import DocsHeader from "@/components/website/docs-header";
import Spotlight from "@/components/website/spotlight";
import { Sidebar } from "@/components/website/sidebar";
import { paths } from "@/lib/paths";

export default function DocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-muted grid h-dvh overflow-hidden md:grid-cols-[16rem_1fr]">
            <Sidebar />
            <div className="relative m-3 min-h-0 min-w-0 overflow-hidden rounded-4xl bg-background">
                <DocsHeader />
                <main className="h-full min-w-0 overflow-y-auto overscroll-none px-4 pb-2 pt-28 scroll-pt-28 [mask-image:linear-gradient(to_bottom,transparent_0,black_12rem,black_calc(100%_-_4rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0,black_12rem,black_calc(100%_-_4rem),transparent_100%)] prose prose-neutral dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto mx-auto max-w-full md:max-w-4xl md:px-8 xl:pr-12 scrollbar-none">
                    {children}
                </main>
                <Spotlight routes={paths} />
            </div>
        </div>
    );
}

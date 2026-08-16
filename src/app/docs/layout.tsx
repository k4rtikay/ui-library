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
        <div className="grid h-dvh overflow-hidden md:grid-cols-[16rem_1fr]">
            <Sidebar /> 
            <div className="relative flex min-h-0 min-w-0 flex-col items-start justify-start pb-2 px-4 overflow-y-auto">
                <DocsHeader />
                <Spotlight routes={paths} />
                <main className="min-h-0 prose prose-neutral dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto mr-0 max-w-full min-w-0 flex-1 md:px-4 pt-8 lg:pt-4 xl:mr-12">
                    {children}
                </main>
            </div>
        </div>
    );
}

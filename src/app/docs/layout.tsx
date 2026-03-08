import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/website/mode-toggle";
import { Sidebar } from "@/components/website/sidebar";
import MobileNav from "@/components/website/mobile-nav";

export default function DocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col">
            <header className="sticky top-0 w-full flex items-center justify-between py-2 px-4 border-b-2 z-50 bg-white dark:bg-zinc-950 ">
                <MobileNav />
                <Link href="/" className="flex items-center gap-1">
                    <Image
                        src="/flow-kit-icon.png"
                        alt="Flow Kit Logo"
                        width={32}
                        height={32}
                    />
                    <span className="text-lg font-semibold">Flow Kit</span>
                </Link>
                <ModeToggle />
            </header>
            <div className="flex flex-1 items-start pb-2 px-4">
                <Sidebar />
                <main className="prose prose-neutral dark:prose-invert prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20 prose-strong:font-medium prose-table:block prose-table:overflow-y-auto mr-0 max-w-full min-w-0 flex-1 md:px-4 pt-8 pb-16 lg:pt-12 xl:mr-12 xl:max-w-4xl">
                    {children}
                </main>
            </div>
        </div>
    );
}

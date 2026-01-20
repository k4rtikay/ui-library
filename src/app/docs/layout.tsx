import { Sidebar } from "@/components/website/sidebar";

export default function DocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1">{children}</div>
        </div>
    );
}
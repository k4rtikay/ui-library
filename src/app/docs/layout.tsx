import { DocsShell } from "@/components/website/docs-shell";

export default function DocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DocsShell>{children}</DocsShell>
    );
}

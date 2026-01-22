"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type PackageManager = "npm" | "pnpm" | "bun" | "yarn"

interface CommandCopyProps {
    command: {
        npm: string
        pnpm: string
        bun: string
        yarn: string
    }
    className?: string
    children: React.ReactNode
}

export function CommandCopy({ command, className, children }: CommandCopyProps) {
    const [packageManager, setPackageManager] = React.useState<PackageManager>("npm")

    React.useEffect(() => {
        const saved = localStorage.getItem("package-manager") as PackageManager
        if (saved) setPackageManager(saved)
    }, [])

    const updatePreference = (value: string) => {
        const pm = value as PackageManager
        setPackageManager(pm)
        localStorage.setItem("package-manager", pm)
    }

    const [hasCopied, setHasCopied] = React.useState(false)
    const copyCommand = () => {
        navigator.clipboard.writeText(command[packageManager])
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return (
        <div className={cn("w-full", className)}>

            <Tabs
                defaultValue="cli"
                className="relative w-full gap-0"
            >
                <TabsList>
                    <TabsTrigger key={"cli"} value="cli">CLI</TabsTrigger>
                    <TabsTrigger key={"manual"} value="manual">Manual</TabsTrigger>
                </TabsList>

                <TabsContent value="cli">
                    <Tabs
                        defaultValue={packageManager}
                        onValueChange={updatePreference}
                        className="relative w-full gap-0"
                    >
                        <div className="flex items-center justify-between px-4 bg-zinc-100 dark:bg-zinc-900 rounded-t-lg border border-b-0">
                            <TabsList className="p-0">
                                {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                                    <TabsTrigger
                                        key={pm}
                                        value={pm}
                                        className="h-10 border-b-2 border-transparent px-4 bg-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none"
                                    >
                                        {pm}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="relative rounded-b-lg border px-4 py-4">
                            <code className="font-mono text-sm">
                                {command[packageManager]}
                            </code>

                            <button
                                className="absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                                onClick={copyCommand}
                            >
                                {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                <span className="sr-only">Copy command</span>
                            </button>
                        </div>
                    </Tabs>
                </TabsContent>

                <TabsContent value="manual">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manual Installation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <code className="font-mono text-sm">
                                {children}
                            </code>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* <Tabs
                value={packageManager}
                onValueChange={updatePreference}
                className="relative w-full gap-0"
            >
                <div className="flex items-center justify-between px-4 bg-zinc-100 dark:bg-zinc-900 rounded-t-lg border border-b-0">
                    <TabsList className="p-0">
                        {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                            <TabsTrigger
                                key={pm}
                                value={pm}
                                className="h-10 border-b-2 border-transparent px-4 bg-transparent text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent shadow-none"
                            >
                                {pm}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="relative rounded-b-lg border px-4 py-4">
                    <code className="font-mono text-sm">
                        {command[packageManager]}
                    </code>

                    <button
                        className="absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
                        onClick={copyCommand}
                    >
                        {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span className="sr-only">Copy command</span>
                    </button>
                </div>
            </Tabs> */}
        </div>
    )
}
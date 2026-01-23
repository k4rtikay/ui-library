"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"

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
                className="relative w-full"
            >
                <TabsList
                    variant="line"
                    className="border-b w-full justify-start px-0"
                >
                    <div className="flex items-center gap-2">
                        <TabsTrigger key={"cli"} value="cli">CLI</TabsTrigger>
                        <TabsTrigger key={"manual"} value="manual">Manual</TabsTrigger>
                    </div>
                </TabsList>

                <TabsContent value="cli">
                    <Tabs
                        defaultValue={packageManager}
                        onValueChange={updatePreference}
                        className="relative w-full gap-0"
                    >
                        <div className="flex items-center justify-between px-4 bg-zinc-100 dark:bg-zinc-900 rounded-t-lg border border-b-0">
                            <TabsList className="p-0 bg-transparent">
                                {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                                    <TabsTrigger
                                        key={pm}
                                        value={pm}
                                        className="p-2 bg-transparent"
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

                            <Button
                                className="absolute right-4 top-4 z-10 inline-flex h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
                                onClick={copyCommand}
                                variant="ghost"
                            >
                                {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                <span className="sr-only">Copy command</span>
                            </Button>
                        </div>
                    </Tabs>
                </TabsContent>

                <TabsContent value="manual">
                    <p>Copy this code and paste it into a card-stack.tsx file.</p>
                    <p>Update the imports as needed.</p>
                    <Card>
                        <CardContent>
                            {children}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
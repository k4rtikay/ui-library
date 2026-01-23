"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
    text?: string
    onCopy?: () => string
    className?: string
}

export default function CopyButton({ text, className, onCopy }: CopyButtonProps){
    const [hasCopied, setHasCopied] = useState<boolean>(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    const handleCopy = () =>{
        if(onCopy){
            const val = onCopy()
            copyToClipboard(val)
            return
        }
        
        if(text){
            copyToClipboard(text)
        }
    }

    return (
        <Button
            onClick={handleCopy}
            variant="ghost"
            className={cn("inline-flex h-6 w-6 rounded-sm opacity-70 hover:opacity-100", className)}
        >
            {hasCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            <span className="sr-only">Copy command</span>
        </Button>
    )
}
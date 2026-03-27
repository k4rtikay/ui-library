"use client";

import { useState } from "react";
import { PinnedList, PinnedListItem } from "./pinned-list";
import {
    Palette,
    Lock,
    LayoutDashboard,
    Gauge,
    Search,
    Bell,
    Upload,
    BarChart3,
} from "lucide-react";

const INITIAL_ITEMS: PinnedListItem[] = [
    {
        id: "1",
        content: (
            <>
                <Palette className="w-4 h-4 shrink-0 text-pink-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Design System Tokens</p>
                    <p className="text-xs text-muted-foreground truncate">Color, spacing, and typography primitives</p>
                </div>
            </>
        ),
        pinned: true,
    },
    {
        id: "2",
        content: (
            <>
                <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Auth Flow</p>
                    <p className="text-xs text-muted-foreground truncate">Login, signup, and password reset</p>
                </div>
            </>
        ),
        pinned: true,
    },
    {
        id: "3",
        content: (
            <>
                <LayoutDashboard className="w-4 h-4 shrink-0 text-blue-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Dashboard Layout</p>
                    <p className="text-xs text-muted-foreground truncate">Sidebar navigation with collapsible sections</p>
                </div>
            </>
        ),
        pinned: false,
    },
    {
        id: "4",
        content: (
            <>
                <Gauge className="w-4 h-4 shrink-0 text-red-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">API Rate Limiter</p>
                    <p className="text-xs text-muted-foreground truncate">Token-bucket middleware for Express</p>
                </div>
            </>
        ),
        pinned: false,
    },
    {
        id: "5",
        content: (
            <>
                <Search className="w-4 h-4 shrink-0 text-violet-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Search Indexer</p>
                    <p className="text-xs text-muted-foreground truncate">Full-text search with fuzzy matching</p>
                </div>
            </>
        ),
        pinned: false,
    },
    {
        id: "6",
        content: (
            <>
                <Bell className="w-4 h-4 shrink-0 text-emerald-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Notification Service</p>
                    <p className="text-xs text-muted-foreground truncate">Email, push, and in-app notifications</p>
                </div>
            </>
        ),
        pinned: false,
    },
    {
        id: "7",
        content: (
            <>
                <Upload className="w-4 h-4 shrink-0 text-cyan-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">File Uploader</p>
                    <p className="text-xs text-muted-foreground truncate">Drag-and-drop with progress tracking</p>
                </div>
            </>
        ),
        pinned: false,
    },
    {
        id: "8",
        content: (
            <>
                <BarChart3 className="w-4 h-4 shrink-0 text-orange-400" />
                <div className="min-w-0 flex flex-col">
                    <p className="text-sm font-medium text-foreground truncate">Analytics Pipeline</p>
                    <p className="text-xs text-muted-foreground truncate">Event collection and aggregation</p>
                </div>
            </>
        ),
        pinned: false,
    },
];

export default function PinnedListDemo() {
    const [items, setItems] = useState<PinnedListItem[]>(INITIAL_ITEMS);

    const handleTogglePin = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, pinned: !item.pinned } : item
            )
        );
    };

    return (
        <div className="w-full p-8 flex justify-center">
            <PinnedList items={items} onTogglePin={handleTogglePin} />
        </div>
    );
}
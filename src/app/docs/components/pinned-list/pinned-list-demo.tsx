"use client";

import { useState } from "react";
import { PinnedList } from "./pinned-list";
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

interface DemoItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    description: string;
}

const ITEMS: DemoItem[] = [
    {
        id: "1",
        icon: <Palette className="w-4 h-4 text-pink-400" />,
        label: "Design System Tokens",
        description: "Color, spacing, and typography primitives",
    },
    {
        id: "2",
        icon: <Lock className="w-4 h-4 text-amber-400" />,
        label: "Auth Flow",
        description: "Login, signup, and password reset",
    },
    {
        id: "3",
        icon: <LayoutDashboard className="w-4 h-4 text-blue-400" />,
        label: "Dashboard Layout",
        description: "Sidebar navigation with collapsible sections",
    },
    {
        id: "4",
        icon: <Gauge className="w-4 h-4 text-red-400" />,
        label: "API Rate Limiter",
        description: "Token-bucket middleware for Express",
    },
    {
        id: "5",
        icon: <Search className="w-4 h-4 text-violet-400" />,
        label: "Search Indexer",
        description: "Full-text search with fuzzy matching",
    },
    {
        id: "6",
        icon: <Bell className="w-4 h-4 text-emerald-400" />,
        label: "Notification Service",
        description: "Email, push, and in-app notifications",
    },
    {
        id: "7",
        icon: <Upload className="w-4 h-4 text-cyan-400" />,
        label: "File Uploader",
        description: "Drag-and-drop with progress tracking",
    },
    {
        id: "8",
        icon: <BarChart3 className="w-4 h-4 text-orange-400" />,
        label: "Analytics Pipeline",
        description: "Event collection and aggregation",
    },
];

const INITIAL_PINNED = new Set(["1", "2"]);

export default function PinnedListDemo() {
    const [pinnedIds, setPinnedIds] = useState<Set<string>>(INITIAL_PINNED);

    const handleTogglePin = (id: string) => {
        setPinnedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <div className="w-full p-8 flex justify-center">
            <PinnedList pinnedIds={pinnedIds} onTogglePin={handleTogglePin}>
                {ITEMS.map((item) => (
                    <PinnedList.Item key={item.id} id={item.id}>
                        {item.icon}
                        <div className="min-w-0 flex flex-col">
                            <p className="text-sm font-medium text-foreground truncate">
                                {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {item.description}
                            </p>
                        </div>
                    </PinnedList.Item>
                ))}
            </PinnedList>
        </div>
    );
}
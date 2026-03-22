"use client";

import { useState } from "react";
import { PinnedList, PinnedListItem } from "./pinned-list";

const INITIAL_ITEMS: PinnedListItem[] = [
    {
        id: "1",
        label: "Design System Tokens",
        description: "Color, spacing, and typography primitives",
        pinned: true,
    },
    {
        id: "2",
        label: "Auth Flow",
        description: "Login, signup, and password reset",
        pinned: true,
    },
    {
        id: "3",
        label: "Dashboard Layout",
        description: "Sidebar navigation with collapsible sections",
        pinned: false,
    },
    {
        id: "4",
        label: "API Rate Limiter",
        description: "Token-bucket middleware for Express",
        pinned: false,
    },
    {
        id: "5",
        label: "Search Indexer",
        description: "Full-text search with fuzzy matching",
        pinned: false,
    },
    {
        id: "6",
        label: "Notification Service",
        description: "Email, push, and in-app notifications",
        pinned: false,
    },
    {
        id: "7",
        label: "File Uploader",
        description: "Drag-and-drop with progress tracking",
        pinned: false,
    },
    {
        id: "8",
        label: "Analytics Pipeline",
        description: "Event collection and aggregation",
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
        <div className="w-full p-8">
            <PinnedList items={items} onTogglePin={handleTogglePin} />
        </div>
    );
}
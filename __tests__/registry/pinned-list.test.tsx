import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { PinnedList, PinnedListItem } from "../../registry/pinned-list";

// Sample data for our tests
const mockItems: PinnedListItem[] = [
    { id: "1", content: "First Item", pinned: true },
    { id: "2", content: "Second Item", pinned: false },
    { id: "3", content: "Third Item", pinned: false },
];

describe("PinnedList", () => {
    it("renders pinned and unpinned sections correctly", () => {
        const handleToggle = vi.fn();
        render(<PinnedList items={mockItems} onTogglePin={handleToggle} />);

        expect(screen.getByText("Pinned")).toBeInTheDocument();
        expect(screen.getByText("All Items")).toBeInTheDocument();

        expect(screen.getByText("First Item")).toBeInTheDocument();
        expect(screen.getByText("Second Item")).toBeInTheDocument();
        expect(screen.getByText("Third Item")).toBeInTheDocument();
    });

    it("does not render a section if it has no items", () => {
        const handleToggle = vi.fn();
        const allUnpinned: PinnedListItem[] = [
            { id: "1", content: "First Item", pinned: false },
        ];
        
        render(<PinnedList items={allUnpinned} onTogglePin={handleToggle} />);

        // "All Items" should exist, but "Pinned" should not be in the DOM
        expect(screen.getByText("All Items")).toBeInTheDocument();
        expect(screen.queryByText("Pinned")).not.toBeInTheDocument();
    });

    it("calls onTogglePin with the correct ID when a button is clicked", async () => {
        const handleToggle = vi.fn();
        const user = userEvent.setup();
        render(<PinnedList items={mockItems} onTogglePin={handleToggle} />);

        const secondItemRow = screen.getByText("Second Item").closest("li")!;
        const pinButton = secondItemRow.querySelector("button")!;

        await user.click(pinButton);

        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith("2");
    });

    it("calls onTogglePin when pressing Enter on a button", async () => {
        const handleToggle = vi.fn();
        const user = userEvent.setup();
        render(<PinnedList items={mockItems} onTogglePin={handleToggle} />);

        const secondItemRow = screen.getByText("Second Item").closest("li")!;
        const pinButton = secondItemRow.querySelector("button")!;

        pinButton.focus();
        await user.keyboard("{Enter}");

        expect(handleToggle).toHaveBeenCalledTimes(1);
        expect(handleToggle).toHaveBeenCalledWith("2");
    });

    it("moves an item to the Pinned section when its pinned state changes", () => {
      const { rerender } = render(<PinnedList items={mockItems} onTogglePin={vi.fn()} />);
      const updated = mockItems.map(i => i.id === "2" ? { ...i, pinned: true } : i);
      rerender(<PinnedList items={updated} onTogglePin={vi.fn()} />);
    
      const pinnedSection = screen.getByText("Pinned").closest("section")!;
      expect(within(pinnedSection).getByText("Second Item")).toBeInTheDocument();
    });
});
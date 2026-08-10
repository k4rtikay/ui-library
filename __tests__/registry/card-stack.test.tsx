import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { CardStack } from "../../registry/card-stack";

const renderCardStack = () => {
    render(
        <CardStack>
            <div>Card 1 Content</div>
            <div>Card 2 Content</div>
            <div>Card 3 Content</div>
        </CardStack>,
    );
};

describe("CardStack", () => {
    it("renders all cards and sets first card as active", () => {
        renderCardStack();
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const secondCard = screen.getByLabelText("Card 2 of 3");

        expect(firstCard).toHaveAttribute("aria-current", "true");
        expect(secondCard).not.toHaveAttribute("aria-current");
    });

    it("cycles to the next card when clicked", async () => {
        const user = userEvent.setup();
        renderCardStack();
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const secondCard = screen.getByLabelText("Card 2 of 3");
        await user.click(firstCard);
        expect(firstCard).not.toHaveAttribute("aria-current", "true");
        expect(secondCard).toHaveAttribute("aria-current", "true");
    });

    it.each([
        ["Enter", "{Enter}"],
        ["Space", " "],
        ["ArrowRight", "{ArrowRight}"],
        ["ArrowDown", "{ArrowDown}"],
    ])("cycles to next card using the %s key", async (_, key) => {
        const user = userEvent.setup();
        renderCardStack();
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const secondCard = screen.getByLabelText("Card 2 of 3");
        await user.tab();
        await user.keyboard(key);
        expect(firstCard).not.toHaveAttribute("aria-current", "true");
        expect(secondCard).toHaveAttribute("aria-current", "true");
    });

    it.each([
        ["ArrowUp", "{ArrowUp}"],
        ["ArrowLeft", "{ArrowLeft}"],
    ])("cycles to previous card using the %s key", async (_, key) => {
        const user = userEvent.setup();
        renderCardStack();
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const thirdCard = screen.getByLabelText("Card 3 of 3");
        await user.tab();
        await user.keyboard(key);
        expect(firstCard).not.toHaveAttribute("aria-current", "true");
        expect(thirdCard).toHaveAttribute("aria-current", "true");
    });

    it("auto advances to the next card after an interval", () => {
        vi.useFakeTimers();
        render(
            <CardStack autoAdvance={true} autoAdvanceInterval={5000}>
                <div>Card 1</div>
                <div>Card 2</div>
                <div>Card 3</div>
            </CardStack>,
        );
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const secondCard = screen.getByLabelText("Card 2 of 3");

        expect(firstCard).toHaveAttribute("aria-current", "true");
        act(() => {
            vi.advanceTimersByTime(5000);
        });
        expect(firstCard).not.toHaveAttribute("aria-current", "true");
        expect(secondCard).toHaveAttribute("aria-current", "true");
        vi.useRealTimers();
    });

    it("parent is a region", () => {
        renderCardStack();
        const parent = screen.getByRole("region",{ name: "Card stack" });
        expect(parent).toBeInTheDocument();
    });

    it.each([
        ["Enter", "{Enter}"],
        ["Space", " "],
        ["ArrowRight", "{ArrowRight}"],
        ["ArrowDown", "{ArrowDown}"],
    ])("focus moves to next card using the %s key", async (_, key) => {
        const user = userEvent.setup();
        renderCardStack();
        const firstCard = screen.getByLabelText("Card 1 of 3");
        const secondCard = screen.getByLabelText("Card 2 of 3");
        await user.tab();
        expect(firstCard).toHaveFocus();
        await user.keyboard(key);
        expect(secondCard).toHaveFocus();
    });
});

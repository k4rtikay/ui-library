import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import { LoaderButton } from "../../registry/loader-button";

describe("LoaderButton", () => {
    it("renders correctly with default text", () => {
        render(<LoaderButton state="idle">Click Me</LoaderButton>);
        const button = screen.getByRole("button", { name: "Click Me" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-disabled", "false");
    });

    it("disables the button when it is loading", () => {
        render(<LoaderButton state="loading">Click Me</LoaderButton>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("stays focusable while disabled so keyboard focus isn't lost", () => {
        const { rerender } = render(
            <LoaderButton state="idle">Click Me</LoaderButton>,
        );
        const button = screen.getByRole("button");
        button.focus();
        rerender(<LoaderButton state="loading">Click Me</LoaderButton>);
        expect(button).not.toHaveAttribute("disabled");
        expect(button).toHaveFocus();
    });

    it("stays disabled while not idle even if disabled={false} is passed", () => {
        render(
            <LoaderButton state="loading" disabled={false}>
                Click Me
            </LoaderButton>,
        );
        expect(screen.getByRole("button")).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });

    it("sets aria-busy when loading", () => {
        render(<LoaderButton state="loading">Click Me</LoaderButton>);
        expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("handles the error state correctly", () => {
        render(<LoaderButton state="error">Click Me</LoaderButton>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("handles the success state correctly", () => {
        render(<LoaderButton state="success">Click Me</LoaderButton>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("fires the onClick handler when clicked", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        render(
            <LoaderButton state="idle" onClick={handleClick}>
                Click Me
            </LoaderButton>,
        );
        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not fire onClick when the button is disabled (loading state)", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();
        render(
            <LoaderButton state="loading" onClick={handleClick}>
                Click Me
            </LoaderButton>,
        );
        const button = screen.getByRole("button");
        await user.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
});

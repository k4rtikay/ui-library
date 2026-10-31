import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
    SquiggleTabs,
    SquiggleTabsContent,
    SquiggleTabsList,
    SquiggleTabsTrigger,
    useSquiggleTabs,
} from "../../registry/squiggle-tabs";

function Direction({ testId = "direction" }: { testId?: string }) {
    const { direction } = useSquiggleTabs();
    return <span data-testid={testId}>{direction}</span>;
}

function Example(props: React.ComponentProps<typeof SquiggleTabs>) {
    return (
        <SquiggleTabs defaultValue="a" {...props}>
            <SquiggleTabsList>
                <SquiggleTabsTrigger value="a">A</SquiggleTabsTrigger>
                <SquiggleTabsTrigger value="b">B</SquiggleTabsTrigger>
                <SquiggleTabsTrigger value="c">C</SquiggleTabsTrigger>
            </SquiggleTabsList>
            <SquiggleTabsContent value="a" className="custom-a">
                Panel A
            </SquiggleTabsContent>
            <SquiggleTabsContent value="b">Panel B</SquiggleTabsContent>
            <SquiggleTabsContent value="c">Panel C</SquiggleTabsContent>
            <Direction />
        </SquiggleTabs>
    );
}

describe("SquiggleTabs", () => {
    it("throws when a part is used outside of SquiggleTabs", () => {
        const spy = vi.spyOn(console, "error").mockImplementation(() => {});
        expect(() => render(<Direction />)).toThrow(/within <SquiggleTabs>/);
        spy.mockRestore();
    });

    it("tags triggers with its own data attributes", () => {
        render(<Example />);
        expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute(
            "data-squiggle-value",
            "b",
        );
    });

    it("tracks direction from trigger order", async () => {
        const user = userEvent.setup();
        render(<Example />);

        await user.click(screen.getByRole("tab", { name: "C" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("right");

        await user.click(screen.getByRole("tab", { name: "A" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("left");
    });

    it("computes direction without relying on shadcn's data-slot", async () => {
        const user = userEvent.setup();
        render(<Example />);

        for (const el of document.querySelectorAll("[data-slot]")) {
            el.removeAttribute("data-slot");
        }

        await user.click(screen.getByRole("tab", { name: "C" }));
        await user.click(screen.getByRole("tab", { name: "B" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("left");
    });

    it("ignores triggers of nested tabs when computing direction", async () => {
        const user = userEvent.setup();
        render(
            <SquiggleTabs defaultValue="a">
                <SquiggleTabsList>
                    <SquiggleTabsTrigger value="a">A</SquiggleTabsTrigger>
                    <SquiggleTabsTrigger value="b">B</SquiggleTabsTrigger>
                </SquiggleTabsList>
                <SquiggleTabsContent value="a">
                    <SquiggleTabs defaultValue="x">
                        <SquiggleTabsList>
                            <SquiggleTabsTrigger value="b">
                                Inner B
                            </SquiggleTabsTrigger>
                            <SquiggleTabsTrigger value="a">
                                Inner A
                            </SquiggleTabsTrigger>
                        </SquiggleTabsList>
                    </SquiggleTabs>
                </SquiggleTabsContent>
                <Direction />
            </SquiggleTabs>,
        );

        // If inner triggers leaked in, "b" would come before "a".
        await user.click(screen.getByRole("tab", { name: "B" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("right");
    });

    it("works when controlled and reports changes", async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        render(<Example value="a" onValueChange={onValueChange} />);

        await user.click(screen.getByRole("tab", { name: "B" }));
        expect(onValueChange).toHaveBeenCalledWith("b");
        expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute(
            "data-state",
            "active",
        );
    });

    it("updates direction when the parent changes a controlled value", async () => {
        const user = userEvent.setup();
        function Controlled() {
            const [value, setValue] = React.useState("b");
            return (
                <>
                    <button onClick={() => setValue("c")}>go to c</button>
                    <button onClick={() => setValue("a")}>go to a</button>
                    <Example value={value} onValueChange={setValue} />
                </>
            );
        }
        render(<Controlled />);

        await user.click(screen.getByRole("button", { name: "go to a" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("left");
        expect(screen.getByText("Panel A").style.opacity).toBe("0");

        await user.click(screen.getByRole("button", { name: "go to c" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("right");
    });

    it("keeps direction when a controlled parent rejects the change", async () => {
        const user = userEvent.setup();
        render(<Example value="b" onValueChange={() => {}} />);

        await user.click(screen.getByRole("tab", { name: "A" }));
        expect(screen.getByTestId("direction")).toHaveTextContent("right");
    });

    it("does not animate the initially active panel", () => {
        render(<Example />);
        const panel = screen.getByText("Panel A");
        expect(panel.style.opacity).not.toBe("0");
    });

    it("animates panels that mount after navigating", async () => {
        const user = userEvent.setup();
        render(<Example />);

        await user.click(screen.getByRole("tab", { name: "B" }));
        expect(screen.getByText("Panel B").style.opacity).toBe("0");
    });

    it("applies className to the element wrapping the children", () => {
        render(<Example />);
        const content = screen.getByText("Panel A");
        expect(content).toHaveClass("custom-a");
        expect(content.parentElement).toHaveAttribute("role", "tabpanel");
        expect(content.parentElement).toHaveClass("overflow-x-clip");
    });
});

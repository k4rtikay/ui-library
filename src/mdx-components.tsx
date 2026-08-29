import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

function getTextContent(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getTextContent).join("");
    }

    if (isValidElement<{ children?: ReactNode }>(node)) {
        return getTextContent(node.props.children);
    }

    return "";
}

function createHeadingId(children: ReactNode) {
    return getTextContent(children)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function Heading1({ children, id, ...props }: ComponentPropsWithoutRef<"h1">) {
    return (
        <h1 id={id ?? "introduction"} {...props}>
            {children}
        </h1>
    );
}

function Heading2({ children, id, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2 id={id ?? createHeadingId(children)} {...props}>
            {children}
        </h2>
    );
}

function Heading3({ children, id, ...props }: ComponentPropsWithoutRef<"h3">) {
    return (
        <h3 id={id ?? createHeadingId(children)} {...props}>
            {children}
        </h3>
    );
}

export function useMDXComponents(): MDXComponents {
    return {
        h1: Heading1,
        h2: Heading2,
        h3: Heading3,
        table: (props) => (
            <div className="not-prose my-6 w-full overflow-y-auto rounded-lg border border-border">
                <table className="w-full text-sm" {...props} />
            </div>
        ),
        thead: (props) => (
            <thead
                className="w-full text-left text-sm font-medium"
                {...props}
            />
        ),
        tbody: (props) => (
            <tbody
                className="w-full text-left text-sm font-medium"
                {...props}
            />
        ),
        th: (props) => (
            <th
                className="border-b border-border bg-muted px-4 py-3 text-left font-medium text-foreground dark:bg-muted [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-normal [&_code]:dark:bg-zinc-800"
                {...props}
            />
        ),
        td: (props) => (
            <td
                className="border-b border-border px-4 py-3 [&_code]:rounded [&_code]:bg-zinc-200/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-normal [&_code]:dark:bg-zinc-800"
                {...props}
            />
        ),
        ...components,
    };
}

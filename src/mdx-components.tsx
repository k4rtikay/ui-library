import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return {
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

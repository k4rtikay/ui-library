import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {}
 
export function useMDXComponents(): MDXComponents {
  return {
    // Allows you to customize standard markdown elements
    table: (props) => (
      <div className="not-prose my-6 w-full overflow-y-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => (
      <thead className="w-full text-left text-sm font-medium text-zinc-500 dark:text-zinc-400" {...props} />
    ),
    tbody: (props) => (
      <tbody className="w-full text-left text-sm font-medium text-zinc-500 dark:text-zinc-400" {...props} />
    ),
    th: (props) => (
      <th
        className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-left font-medium text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-b border-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
        {...props}
      />
    ),
    ...components,
  }
}
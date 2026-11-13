import createMDX from "@next/mdx";

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
    theme: {
        light: "min-light",
        dark: "one-dark-pro",
    },
    keepBackground: true,
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: ["remark-code-import", "remark-gfm"],
        rehypePlugins: [["rehype-pretty-code", prettyCodeOptions]],
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "assets.aceternity.com",
            },
        ],
    },
};

export default withMDX(nextConfig);

import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import { codeImport } from 'remark-code-import';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  theme: {
    light: 'min-light',
    dark: 'min-dark',
  },
  keepBackground: false,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [codeImport],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },
};

export default withMDX(nextConfig);
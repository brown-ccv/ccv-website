import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // turbopack: {
  //   resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  // },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // remarkPlugins: ['remark-gfm'],
    // rehypePlugins: ['rehype-raw']
  },
})

export default withMDX(nextConfig)

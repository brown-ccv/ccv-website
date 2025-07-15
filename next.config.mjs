import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)

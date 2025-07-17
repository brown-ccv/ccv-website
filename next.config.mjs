import createMDX from '@next/mdx'
import remarkGFM from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGFM]
  },
})

export default withMDX(nextConfig)

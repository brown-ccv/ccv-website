import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import rehypePrismPlus from "rehype-prism-plus"

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypePrismPlus],
  },
})

export default withMDX(nextConfig)

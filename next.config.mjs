import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import rehypePrismPlus from "rehype-prism-plus"

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT && {
    output: "export",
    trailingSlash: false,
    images: {
      unoptimized: true,
    },
  }),
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [rehypePrismPlus],
  },
})

export default withMDX(nextConfig)

import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
  images: {
    qualities: [75, 90, 100],
    formats: ["image/webp", "image/avif"],
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack requires serializable loader options, so plugins are
    // referenced by name rather than imported as functions.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-prism-plus"],
  },
})

export default withMDX(nextConfig)

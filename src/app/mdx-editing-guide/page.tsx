import { Hero } from "@/components/Hero"
import MDXEditingGuideContent from "@/content/routes/mdx-editing-guide.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MDX Editing Guide",
}

export default function Page() {
  const metadata = getMDXMetadata("src/content/routes/mdx-editing-guide.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <MDXEditingGuideContent />
    </>
  )
}

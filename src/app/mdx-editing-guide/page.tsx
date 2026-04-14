import { Hero } from "@/components/Hero"
import MDXEditingGuideContent from "@/content/routes/mdx-editing-guide.mdx"
import { getMDXMetadata } from "@/utils/mdx"

export default function Page() {
  const metadata = getMDXMetadata("src/content/routes/mdx-editing-guide.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <MDXEditingGuideContent />
    </>
  )
}

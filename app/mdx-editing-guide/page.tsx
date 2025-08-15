import Hero from "@/components/Hero"
import MDXEditingGuideContent from "@/content/mdx-editing-guide.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata("content/mdx-editing-guide.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <div className="prose prose-lg max-w-none text-xl">
        <MDXEditingGuideContent />
      </div>
    </>
  )
}

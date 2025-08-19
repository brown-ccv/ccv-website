import { Hero } from "@/components/Hero"
import AIToolsContent from "@/content/services/ai-tools.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function AITools() {
  const metadata = getMDXMetadata("content/services/ai-tools.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <AIToolsContent />
    </>
  )
}

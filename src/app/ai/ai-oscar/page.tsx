import { Hero } from "@/components/Hero"
import AIOscarContent from "@/content/routes/ai/ai-oscar.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function AIOscar() {
  const metadata = getMDXMetadata("content/routes/ai/ai-oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <AIOscarContent />
    </>
  )
}

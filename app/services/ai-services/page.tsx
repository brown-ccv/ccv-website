import { Hero } from "@/components/Hero"
import AIServicesContent from "@/content/services/ai-services.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function AIServices() {
  const metadata = getMDXMetadata("content/services/ai-services.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <AIServicesContent />
    </>
  )
}

import { Hero } from "@/components/Hero"
import { ContentSection } from "@/components/ui/content-section"
import PageContent from "@/content/services/ai-services.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata("content/services/ai-services.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <ContentSection>
        <div className="prose prose-lg text-xl max-w-none">
          <PageContent />
        </div>
      </ContentSection>
    </>
  )
}

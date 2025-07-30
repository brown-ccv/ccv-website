import { Hero } from "@/components/Hero"
import { ContentSection } from "@/components/ui/ContentSection"
import StrongholdContent from "@/content/services/stronghold.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata("content/services/stronghold.mdx")

  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <ContentSection>
        <div className="prose prose-lg text-xl max-w-none">
          <StrongholdContent />
        </div>
      </ContentSection>
    </div>
  )
}

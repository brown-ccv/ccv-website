import { Hero } from "@/components/Hero"
import { ContentSection } from "@/components/ui/content-section"
import ClassroomContent from "@/content/services/classroom.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function ClassroomSupport() {
  const metadata = getMDXMetadata("content/services/classroom.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <ContentSection>
        <div className="prose prose-lg text-xl max-w-none">
          <ClassroomContent />
        </div>
      </ContentSection>
    </>
  )
}

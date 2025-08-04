import { Hero } from "@/components/Hero"
import ProjectConsultingContent from "@/content/services/project-consulting.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function ProjectConsulting() {
  const metadata = getMDXMetadata("content/services/project-consulting.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <div className="prose prose-lg text-xl max-w-none">
        <ProjectConsultingContent />
      </div>
    </>
  )
}
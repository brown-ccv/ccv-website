import { Hero } from "@/components/Hero"
import ClassroomContent from "@/content/services/classroom.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function ClassroomSupport() {
  const metadata = getMDXMetadata("content/services/classroom.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <ClassroomContent />
    </>
  )
}

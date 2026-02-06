import { Hero } from "@/components/Hero"
import DepartmentSupportContent from "@/content/routes/services/department-support.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function DepartmentSupport() {
  const metadata = getMDXMetadata(
    "content/routes/services/department-support.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <DepartmentSupportContent />
    </>
  )
}

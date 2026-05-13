import { Hero } from "@/components/Hero"
import DepartmentSupportContent from "@/content/routes/services/department-support.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Department Support",
}

export default function DepartmentSupport() {
  const metadata = getMDXMetadata(
    "src/content/routes/services/department-support.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <DepartmentSupportContent />
    </>
  )
}

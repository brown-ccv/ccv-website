import { Hero } from "@/components/Hero"
import DepartmentSupportContent from "@/content/routes/services/department-support.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata(
  "src/content/routes/services/department-support.mdx"
)

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default function DepartmentSupport() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <DepartmentSupportContent />
    </>
  )
}

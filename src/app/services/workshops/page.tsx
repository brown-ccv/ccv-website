import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/routes/services/workshops.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/services/workshops.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default function UserSupport() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <UserSupportContent />
    </>
  )
}

import { Hero } from "@/components/Hero"
import AIOscarContent from "@/content/routes/ai/ai-oscar.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/ai/ai-oscar.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default function AIOscar() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <AIOscarContent />
    </>
  )
}

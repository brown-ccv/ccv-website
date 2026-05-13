import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import AIToolsContent from "@/content/routes/ai/ai-tools.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/ai/ai-tools.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default function AITools() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description}>
        <ButtonLink
          variant="primary_filled"
          size="lg"
          href="https://ai.ccv.brown.edu"
        >
          Access CCV AI Tools
        </ButtonLink>
      </Hero>
      <AIToolsContent />
    </>
  )
}

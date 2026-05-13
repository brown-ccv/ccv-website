import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import AIToolsContent from "@/content/routes/ai/ai-tools.mdx"
import { getMDXMetadata } from "@/utils/mdx"

export default function AITools() {
  const metadata = getMDXMetadata("src/content/routes/ai/ai-tools.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
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

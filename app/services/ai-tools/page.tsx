import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import AIToolsContent from "@/content/services/ai-tools.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function AITools() {
  const metadata = getMDXMetadata("content/services/ai-tools.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="primary_filled"
          size="xl"
          href="https://ai.ccv.brown.edu"
          external={true}
        >
          Access CCV AI Tools
        </ButtonLink>
      </Hero>
      <AIToolsContent />
    </>
  )
}

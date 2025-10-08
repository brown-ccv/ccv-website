import { Hero } from "@/components/Hero"
import { ButtonLink } from "@/components/button/ButtonLink"
import AIOscarContent from "@/content/ai/ai-oscar.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function AIOscar() {
  const metadata = getMDXMetadata("content/ai/ai-oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        {/* <ButtonLink
          variant="primary_filled"
          size="lg"
          href="https://ai.ccv.brown.edu"
          external={true}
        >
          Access CCV AI Tools
        </ButtonLink> */}
      </Hero>
      <AIOscarContent />
    </>
  )
}

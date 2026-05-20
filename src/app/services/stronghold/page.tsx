import { Hero } from "@/components/Hero"
import StrongholdContent from "@/content/routes/services/stronghold.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import { ButtonLink } from "@/components/button/ButtonLink"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/services/stronghold.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default function Stronghold() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description}>
        <ButtonLink
          variant="primary_filled"
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/22/group/62/create/256"
        >
          Request Environment
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://docs.ccv.brown.edu/stronghold/"
        >
          Documentation
        </ButtonLink>
      </Hero>
      <StrongholdContent />
    </>
  )
}

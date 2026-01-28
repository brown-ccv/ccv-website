import { Hero } from "@/components/Hero"
import StrongholdContent from "@/content/routes/services/stronghold.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { ButtonLink } from "@/components/button/ButtonLink"

export default function Stronghold() {
  const metadata = getMDXMetadata("content/routes/services/stronghold.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
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

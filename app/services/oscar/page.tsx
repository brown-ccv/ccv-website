import { Hero } from "@/components/Hero"
import OscarContent from "@/content/services/oscar.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import ButtonLink from "@/components/button/ButtonLink"

export default async function Oscar() {
  const metadata = getMDXMetadata("content/services/oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="primary_filled"
          size="lg"
          external={true}
          href="https://brown.co1.qualtrics.com/jfe/form/SV_0GtBE8kWJpmeG4B"
        >
          Request an Account
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          external={true}
          href="https://docs.ccv.brown.edu/oscar"
        >
          Read the Docs
        </ButtonLink>
      </Hero>
      <OscarContent />
    </>
  )
}

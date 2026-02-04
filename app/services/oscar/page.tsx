import { Hero } from "@/components/Hero"
import OscarContent from "@/content/routes/services/oscar.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { ButtonLink } from "@/components/button/ButtonLink"

export default async function Oscar() {
  const metadata = getMDXMetadata("content/routes/services/oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="primary_filled"
          size="lg"
          href="https://brown.co1.qualtrics.com/jfe/form/SV_0GtBE8kWJpmeG4B"
        >
          Request an Account
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://docs.ccv.brown.edu/oscar"
        >
          Documentation
        </ButtonLink>
      </Hero>
      <OscarContent />
    </>
  )
}

import { Hero } from "@/components/Hero"
import OscarContent from "@/content/routes/services/oscar.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import { ButtonLink } from "@/components/button/ButtonLink"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/services/oscar.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default async function Oscar() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description}>
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

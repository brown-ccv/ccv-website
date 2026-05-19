import React from "react"
import { Hero } from "@/components/Hero"
import { ContentSection } from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import CareersContent from "@/content/routes/about/careers.mdx"
import { CareerData } from "@/components/CareerData"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/about/careers.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default async function Careers() {
  return (
    <>
      <Hero
        image={frontMatter.image}
        title={frontMatter.title}
        description={frontMatter.description}
      >
        <ButtonLink href="/about/help#contact-us" variant="primary_filled">
          Contact Us
        </ButtonLink>
      </Hero>
      <ContentSection title="Opportunities" className="bg-neutral-50">
        <CareerData />
      </ContentSection>
      <CareersContent />
    </>
  )
}

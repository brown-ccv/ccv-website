import React from "react"
import { Hero } from "@/components/Hero"
import {
  ContentHeader,
  ContentSection,
  ContentTitle,
} from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import CareersContent from "@/content/about/careers.mdx"
import CareerData from "@/components/CareerData"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function Careers() {
  const metadata = getMDXMetadata("content/about/careers.mdx")
  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      >
        <ButtonLink
          href={"/about/help#contact-us"}
          size="xl"
          variant="primary_filled"
        >
          Contact Us
        </ButtonLink>
      </Hero>
      <ContentSection className="bg-neutral-50" id="opportunities">
        <ContentHeader>
          <ContentTitle title="Opportunities" />
        </ContentHeader>
        <CareerData />
      </ContentSection>
      <CareersContent />
    </>
  )
}

import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { ContentSection } from "@/components/ContentSection"
import ButtonLink from "@/components/button/ButtonLink"
import CareersContent from "@/content/about/careers.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function Careers() {
  const metadata = getMDXMetadata("content/about/careers.mdx")
  
  let workdayData = []
  try {
    workdayData = await getWorkdayData()
  } catch (err: any) {
    return (
      <div>
        Error loading careers{" "}
      </div>
    )
  }

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      >
        <ButtonLink
          href={"/about/contact"}
          external={false}
          size="lg"
          variant="primary_filled"
        >
          Contact Us
        </ButtonLink>
      </Hero>
      <ContentSection title="Opportunities" className="bg-neutral-50">
        <Suspense fallback={<Spinner />}>
          <Workday careers={workdayData} />
        </Suspense>
      </ContentSection>
      <CareersContent />
    </>
  )
}

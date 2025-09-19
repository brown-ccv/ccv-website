import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { ContentSection } from "@/components/ContentSection"
import ButtonLink from "@/components/button/ButtonLink"
import CareersContent from "@/content/about/careers.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

const CareerData = async () => {
  try {
    const workdayData = await getWorkdayData()

    return (
      <Suspense fallback={<Spinner />}>
        <Workday careers={workdayData} />
      </Suspense>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="py-10 text-center text-3xl font-semibold">
        Error loading careers{" "}
      </div>
    )
  }
}

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
          href={"/about/contact"}
          external={false}
          size="xl"
          variant="primary_filled"
        >
          Contact Us
        </ButtonLink>
      </Hero>
      <ContentSection title="Opportunities" className="bg-neutral-50">
        {await CareerData()}
      </ContentSection>
      <CareersContent />
    </>
  )
}

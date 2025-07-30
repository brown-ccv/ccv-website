import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { ContentSection } from "@/components/ui/ContentSection"
import { SectionHeader } from "@/components/ui/SectionHeader"
import ButtonLink from "@/components/ui/ButtonLink"

export default async function AboutLayout() {
  try {
    const workdayData = await getWorkdayData()

    return (
      <>
        <Hero image={"/images/hero/about-kayaks.png"} title="Careers" />
        <ContentSection>
          <SectionHeader title="Opportunities" align="center" />
          <Suspense fallback={<Spinner />}>
            <Workday careers={workdayData} />
          </Suspense>
          <ButtonLink
            href={"/about/contact"}
            external={false}
            size="xl"
            variant="primary_filled"
          >
            Contact Us
          </ButtonLink>
        </ContentSection>
      </>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="text-3xl font-semibold py-10 text-center">
        Error loading careers{" "}
      </div>
    )
  }
}

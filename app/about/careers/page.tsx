import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { ContentSection } from "@/components/ContentSection"
import ButtonLink from "@/components/button/ButtonLink"

export default async function Careers() {
  try {
    const workdayData = await getWorkdayData()

    return (
      <>
        <Hero image={"/images/hero/about-kayaks.png"} title="Careers" />
        <ContentSection title="Opportunities">
          <div className="flex flex-col items-start gap-y-6">
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
          </div>
        </ContentSection>
      </>
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

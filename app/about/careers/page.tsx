import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { SectionHeader } from "@/components/ui/section-header"
import ButtonLink from "@/components/ui/button-link"

export default async function AboutLayout() {
  try {
    const workdayData = await getWorkdayData()

    return (
      <div>
        <Hero image={"/images/hero/about-kayaks.png"} title="Careers" />
        <section className="content-wrapper py-24 px-14 lg:px-36 bg-neutral-50">
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
        </section>
      </div>
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

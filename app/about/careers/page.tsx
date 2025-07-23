import React, { Suspense } from "react"
import { Workday } from "@/components/Workday"
import { Hero } from "@/components/Hero"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AboutLayout() {
  try {
    const workdayData = await getWorkdayData()

    return (
      <div>
        <Hero 
          image={"/images/hero/about-kayaks.png"}
          title="Careers"
        />
        <section className="content-wrapper py-24 px-14 lg:px-36 bg-neutral-50">
          <SectionHeader title="Opportunities" align="center" />
          <Suspense fallback={<Spinner />}>
            <Workday careers={workdayData} />
          </Suspense>
          <Button size="lg" variant="primary_filled">
            <Link href={"/about/contact"}>Contact Us</Link>
          </Button>
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

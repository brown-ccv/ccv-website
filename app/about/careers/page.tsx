import React, { Suspense } from "react"
import { Workday } from "@/components/Careers"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"

export default async function Careers() { 
  try {
    const data = getWorkdayData()
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    Careers
                  </TextAnimate>
                  <p className="text-4xl font-semibold leading-[1.5]">
                    Text tbd.
                  </p>
                </div>
              </div>
            </Hero>
          </div>
        </div>

        <section className="content-wrapper py-24 px-36 bg-gray-100">
          <SectionHeader title="Opportunities" align="center" />
          <Suspense fallback={<Spinner />}>
            <Workday data={data} />
          </Suspense>
          <Button size="xl" variant="primary_filled">
            <a href={"/about/contact-us"} target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </Button>
        </section>
      </div>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    Careers
                  </TextAnimate>
                </div>
              </div>
            </Hero>

            <div>
              <p>{err}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

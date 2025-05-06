import React, { Suspense } from "react"
import { Opportunities } from "@/components/Opportunities"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { getWorkdayData } from "@/app/about/queries"
import Spinner from "@/components/assets/Spinner"

export default async function About() {
  
  try {
    const data = getWorkdayData()
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
                  <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                    <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                      <TextAnimate className="font-bold text-6xl md:text-8xl">
                        Careers
                      </TextAnimate>
                      <p className="text-4xl font-semibold">
                        Text tbd.
                      </p>
                    </div>
                  </div>
              </Hero>
              <Suspense fallback={<Spinner />}>
                <Opportunities data={data} />
              </Suspense>
            </div>
        </div>
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
                    <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                      <TextAnimate className="font-bold text-6xl md:text-8xl">
                        Careers
                      </TextAnimate>
                      <p className="text-4xl font-semibold">
                        Text tbd.
                      </p>
                    </div>
                  </div>
              </Hero>
              <p>{err.message}</p>
            </div>
        </div>
      </div>
    )
  }
}

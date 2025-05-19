import React from "react"
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/variants"
import { TextAnimate } from "@/components/magicui/text-animate"

export default async function ClassroomSupport() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    Classroom Support
                  </TextAnimate>
                  <p className="text-4xl font-semibold">
                    CCV services to help faculty in the classroom. We can provide tutorial or give you access to cutting edge technology for teaching with code
                  </p>
                </div>
              </div>
          </Hero>
        </div>
      </div>

      {/* In CVlass Tutorials */}
      <section className="content-wrapper py-24 px-36">
        <SectionHeader title="In-Class Tutorials" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              CCV offers a variety of tutorials to provide students with experience using Brown's HPC systems. CCV staff members provide students with an overview of the topic and guide them through a series of hands-on activities. Tutorials can range from the basics of using HPC systems to the use of specific applications on Brown's HPC systems.
            </p>
          </CardContent>
        </Card>
        <FeaturedCarousel />
        

        {/* <div className="content-wrapper flex justify-center">
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 xs:w-1/2">
            {contactUs.map((card) => (
              <div
                  key={card.title}
                  className="flex-grow max-w-md"
              >
                <div className="inline-flex items-center gap-2 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                    <CardContent className="flex flex-col h-full px-6 mx-2">
                      <div className="relative border-b border-neutral-300">
                        <CardHeader className="flex flex-row gap-4 items-center">{card.icon}{card.title}</CardHeader>
                      </div>
                      <CardTitle className="text-lg px-6 flex-grow">{card.description}</CardTitle>
                      <div className="px-6 mt-auto">
                        <Button variant="primary_filled" size="xl">{card.buttonText}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

    </div>
  )
}
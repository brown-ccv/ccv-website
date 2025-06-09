import React from "react"
import path from "path"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardVariants } from "@/components/ui/variants"
import { readContentFile } from "@/lib/content-utils"
import Icon from "@/components/ui/render-icon"

interface DataAnalysisTypes {
  title: string
  icon?: string
  description: string
}
interface SoftwareDevelopmentTypes {
  title: string
  icon?: string
  description: string
}

const fileName = "services.yaml"
const filePath = path.join("content/services", fileName)
const pageContent = await readContentFile(filePath)

export default async function ContactUs() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero image={"/images/hero/about-2.png"}>
            <div className="relative flex-1 flex items-start w-full px-24 bg-gradient-to-t from-black/0 via-black/50 to-black/65 z-5">
              <div className="absolute top-[12%] flex flex-col text-white space-y-6 w-[80vw]">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                  Services
                </TextAnimate>
                <p className="text-4xl font-semibold leading-[1.5]">
                  From office hours to collaborations, the CBC provides a range
                  of services to support Brown's genomic research community.
                </p>
              </div>
            </div>
          </Hero>
        </div>
      </div>

      {/* Office Hours and Support */}
      <section className="content-wrapper py-24 px-6 lg:px-36">
        <SectionHeader title="Office Hours and Support" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-2">
              Need help with your project or using Brown’s computing resources?
              The CBC holds Computational Biology office hours twice weekly and
              is present at weekly Center for Computation and Visualization
              (CCV) office hours. Check our events schedule for upcoming times
              and locations.
              <br />
              <br />
              Need more specialized support beyond office hours? Request a
              consultation with us.
            </p>
          </CardContent>
        </Card>
        <div className="flex flex-row flex-wrap gap-4 pt-2">
          <Button
            variant="primary_filled"
            className="h-[55px] min-w-[155px] self-start md:text-2xl"
          >
            <a href="/#events">View Office Hours</a>
          </Button>
          <Button
            variant="primary_filled"
            className="h-[55px] min-w-[155px] self-start md:text-2xl"
          >
            <a href="mailto:cbc-help@brown.edu">Request Support</a>
          </Button>
        </div>
      </section>
    </div>
  )
}

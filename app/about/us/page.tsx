import React from "react"
import path from 'path'
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { CardWithImage } from "@/components/ui/people-card"
import { readContentFile } from "@/lib/content-utils"
import { PeopleTypes, PageContentData } from "@/lib/about-types"
import fs from "fs/promises"

function imagePath(imageName: string) {return path.join('/images/people', imageName)}

const loadedContent = await readContentFile<PageContentData>('content/about/us.yaml');
const pageContent: PageContentData = loadedContent.data;

async function getImagePaths(imageName: string | null) {
  const defaultPath = "/logos/ccv-logo.svg"

  // If imageName is null, undefined, or empty, return default
  if (!imageName) {
    return { main: defaultPath, hover: defaultPath }
  }

  const mainPath = imagePath(imageName)
  const hoverName = imageName.replace("main", "hover")
  const hoverPath = imagePath(hoverName)

  // Check if the main image exists
  // If it doesn't, return the default path for both main and hover
  try {
    await fs.access(path.join("public", mainPath))
  } catch {
    return { main: defaultPath, hover: defaultPath }
  }

  // Check if the hover image exists
  try {
    await fs.access(path.join("public", hoverPath))
    return { main: mainPath, hover: hoverPath }
  } catch {
    return { main: mainPath, hover: mainPath }
  }
}

export default async function AboutUs() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-blue-navbar">
            <Hero 
              image={"/images/hero/about-kayaks.png"}
              title="About Us"
              description={pageContent.description}
              titleClassName="font-bold text-6xl md:text-8xl"
              descriptionClassName="text-4xl font-semibold leading-[1.5]"
            />
          </div>
        </div>

        {/* Intro to OIT */}
        <section className="content-wrapper py-24">
          <SectionHeader title={pageContent.introToOIT?.title || "Office of Information Technology"} align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
              <p className="text-black text-xl">
                {pageContent.introToOIT?.description}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Mission */}
        <section className="content-wrapper py-24 bg-gray-100">
          <SectionHeader title={pageContent.mission?.title || "Our Mission"} align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
              <p className="text-black text-xl">
                {pageContent.mission?.description}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* People */}
        <div id="people" className="content-wrapper py-12 lg:py-24">
          <SectionHeader title="People" align="center"></SectionHeader>
          <div className="flex justify-center py-4 lg:py-10">
            <div className="flex flex-wrap justify-center gap-y-6 xs:w-1/2">
              {pageContent?.people &&
                (await Promise.all(
                  pageContent.people.map(async (person: PeopleTypes) => {
                    const { main, hover } = await getImagePaths(person.image)
                    return (
                      <div key={person.name}>
                        <CardWithImage
                          imagePath={main}
                          hoverImagePath={hover}
                          name={person?.name}
                          title={person?.title}
                        />
                      </div>
                    )
                  })
                ))}

            </div>
          </div>
        </div>

      {/* Diversity Statement */}
      <section className="content-wrapper py-24 bg-gray-100">
      <SectionHeader title={pageContent.diversityStatement?.title || "Diversity Statement"} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <p className="text-black text-xl whitespace-pre-line">
              {pageContent.diversityStatement?.description}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
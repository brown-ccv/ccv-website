import React from "react"
import path from 'path'
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { CardWithImage } from "@/components/ui/people-card"
import { readContentFile } from "@/lib/content-utils"
import { PeopleTypes, PageContentData } from "@/lib/about-types"
import fs from "fs/promises"
import AboutUsContent from "@/content/about/about-us.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

function imagePath(imageName: string) {return path.join('/images/people', imageName)}

  const loadedContent = await readContentFile<PageContentData>('content/about/people.yaml');
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
  const metadata = getMDXMetadata('content/about/about-us.mdx');

  return (
    <div>
      <Hero 
        image={"/images/hero/about-kayaks.png"}
        title={metadata.title}
        description={metadata.description}
      />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <AboutUsContent />
        </div>
      </section>

      {/* People */}
      <div id="people" className="content-wrapper py-24 px-14">
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
                        personDetails={person}
                      />
                    </div>
                  )
                })
              ))}
          </div>
        </div>
      </div>

    </div>
  )
}
import React from "react"
import path from 'path'
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { CardWithImage } from "@/components/ui/people-card"
import { readContentFile } from "@/lib/content-utils"
import { PeopleTypes, PageContentData } from "@/lib/about-types"
import fs from "fs/promises"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { ContentSection } from "@/components/ui/content-section"

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
      <div>
        <Hero 
          image={"/images/hero/about-kayaks.png"}
          title="About Us"
          description="The Center for Computation and Visualization provides high-performance computing and visualization services to the Brown community. We also collaborate with researchers on projects across vast range of disciplines."
        />

        {/* Intro to OIT */}
        <ContentSection>
          <SectionHeader title="Office of Information Technology" align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
              <div className="prose prose-lg max-w-none text-black text-xl">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {pageContent.introToOIT?.description || ''}
                </Markdown>
              </div>
            </CardContent>
          </Card>
        </ContentSection>

        {/* Our Mission */}
        <ContentSection>
          <SectionHeader title="Our Mission" align="center" />
          <Card className="w-full border-none shadow-none rounded-none">
            <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
              <div className="prose prose-lg max-w-none text-black text-xl">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {pageContent.mission?.description || ''}
                </Markdown>
              </div>
            </CardContent>
          </Card>
        </ContentSection>

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

      {/* Diversity Statement */}
      <ContentSection>
      <SectionHeader title="Diversity Statement" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
            <div className="text-black text-xl whitespace-pre-line prose prose-lg max-w-none">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {pageContent.diversityStatement?.description || ''}
              </Markdown>
            </div>
          </CardContent>
        </Card>
      </ContentSection>
    </div>
  )
}
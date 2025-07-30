import React from "react"
import { PeopleCard } from "@/components/ui/PeopleCard"
import { PeopleTypes, PageContentData } from "@/lib/about-types"
import { readContentFile } from "@/lib/content-utils"
import path from "path"
import fs from "fs/promises"

interface PeopleSectionProps {
  peopleContentPath: string
}

function imagePath(imageName: string) {
  return path.join("/images/people", imageName)
}

async function getImagePaths(imageName: string | null) {
  const defaultPath = "/logos/ccv-logo.svg"

  if (!imageName) {
    return { main: defaultPath, hover: defaultPath }
  }

  const mainPath = imagePath(imageName)
  const hoverName = imageName.replace("main", "hover")
  const hoverPath = imagePath(hoverName)

  try {
    await fs.access(path.join("public", mainPath))
  } catch {
    return { main: defaultPath, hover: defaultPath }
  }

  try {
    await fs.access(path.join("public", hoverPath))
    return { main: mainPath, hover: hoverPath }
  } catch {
    return { main: mainPath, hover: mainPath }
  }
}

// Server component that loads people data
async function PeopleSectionData({ peopleContentPath }: PeopleSectionProps) {
  const loadedContent =
    await readContentFile<PageContentData>(peopleContentPath)
  const pageContent = loadedContent.data

  return (
    <div className="flex justify-center py-4 lg:py-10">
      <div className="flex flex-wrap justify-center gap-y-6 xs:w-1/2">
        {pageContent?.people &&
          (await Promise.all(
            pageContent.people.map(async (person: PeopleTypes) => {
              const { main, hover } = await getImagePaths(person.image)
              return (
                <div key={person.name}>
                  <PeopleCard
                    imagePath={main}
                    hoverImagePath={hover}
                    name={person.name}
                    title={person.title}
                    personDetails={person}
                  />
                </div>
              )
            })
          ))}
      </div>
    </div>
  )
}

// Client component wrapper for MDX compatibility
export const PeopleSection = (props: PeopleSectionProps) => {
  return <PeopleSectionData {...props} />
}

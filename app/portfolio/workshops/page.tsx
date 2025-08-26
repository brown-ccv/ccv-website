import React from "react"
import { Hero } from "@/components/Hero"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { ContentSection } from "@/components/ContentSection"
import { CardGroup } from "@/components/card/CardGroup"
import { ProjectOverviewCard } from "@/components/card/ProjectOverviewCard"

export default async function Portfolio() {
  const portfolioRaw = await readContentFile<{
    workshops: PortfolioEntry[];
  }>("content/portfolio/workshops.yaml")
  const portfolioData = portfolioRaw.data.workshops

  return (
    <>
      <Hero
        title="Workshops"
        description="A collection of workshops and bootcamps that CCV has worked on."
      />
      <ContentSection title="Workshops">
        <CardGroup>
          {portfolioData.map((entry) => (
            <ProjectOverviewCard key={entry.title} entry={entry} />
          ))}
        </CardGroup>
      </ContentSection>    
    </>
  )
}
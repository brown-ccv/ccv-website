import React from "react"
import { Hero } from "@/components/Hero"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { ContentSection } from "@/components/ContentSection"
import { CardGroup } from "@/components/card/CardGroup"
import { ProjectOverviewCard } from "@/components/card/ProjectOverviewCard"

export default async function Portfolio() {
  const portfolioRaw = await readContentFile<{
    projects: PortfolioEntry[];
  }>("content/portfolio/projects.yaml")
  const portfolioData = portfolioRaw.data.projects

  return (
    <>
      <Hero
        title="Projects"
        description="A collection of software and analysis projects that CCV has worked on."
      />
      <ContentSection title="Projects">
        <CardGroup>
          {portfolioData.map((entry) => (
            <ProjectOverviewCard key={entry.title} entry={entry} />
          ))}
        </CardGroup>
      </ContentSection>    
    </>
  )
}
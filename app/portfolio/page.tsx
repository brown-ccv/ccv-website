import React from "react"
import { Hero } from "@/components/Hero"
const portfolioRaw = await readContentFile<{
    portfolio: PortfolioEntry[]
  }>("content/portfolio/portfolio.yaml")
  const portfolioData = portfolioRaw.data.portfolio
import { getMDXMetadata } from "@/lib/mdx-utils"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { StyledCard } from "@/components/card/StyledCard"

export default async function Portfolio() {
  const metadata = getMDXMetadata("content/portfolio/portfolio.yaml")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <div className="prose prose-lg text-xl max-w-none">
        {portfolioData.map((entry) => (
          <StyledCard key={entry.title} title={entry.title} iconName={entry['project-type']}>
            <p>{entry.description}</p>
            <p>{entry['project-type']}</p>
          </StyledCard>
        ))}
      </div>
    </>
  )
}

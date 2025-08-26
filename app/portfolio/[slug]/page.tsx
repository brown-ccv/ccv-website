import React from "react"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { ProjectDetailCard } from "@/components/card/ProjectDetailCard"
import { ButtonLink } from "@/components/button/ButtonLink"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ContentSection } from "@/components/ContentSection"

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const portfolioRaw = await readContentFile<{
    projects: PortfolioEntry[]
  }>("content/portfolio/portfolio.yaml")
  
  return portfolioRaw.data.projects.map((item) => ({
    slug: item.slug,
  }))
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params
  
  const portfolioRaw = await readContentFile<{
    projects: PortfolioEntry[]
  }>("content/portfolio/portfolio.yaml")
  
  const entry = portfolioRaw.data.projects.find(
    project => project.slug === slug
  )

  if (!entry) {
    notFound()
  }    

  return (
      <ContentSection header={false}>
        <ButtonLink href="/portfolio" variant="primary_filled" size="md" external={false}>
          Back to Portfolio
        </ButtonLink>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="prose prose-lg text-xl max-w-none lg:w-2/3">
            {entry.image && (
              <Image src={entry.image} alt={entry.title} width={100} height={100} className="w-full h-auto" />
            )}
            <p>{entry.description}</p>
          </div>
          <div className="lg:w-1/3">
            <ProjectDetailCard entry={entry} />
          </div>
        </div>
      </ContentSection>
  )
}

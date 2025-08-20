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
        <div className="flex gap-8 justify-center">
          <div className="prose prose-lg text-xl max-w-none w-2/3">
            {entry.image && (
              <Image src={entry.image} alt={entry.title} width={100} height={100} className="w-full h-auto" />
            )}
            <p>{entry.description}</p>
          </div>
                     <div className="w-1/3">
             <div className="my-4 py-4">
               <ProjectDetailCard entry={entry} />
             </div>
           </div>
        </div>
      </ContentSection>
  )
}

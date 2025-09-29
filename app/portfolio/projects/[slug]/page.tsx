import React from "react"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { ProjectDetailCard } from "@/components/card/ProjectDetailCard"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ContentSection } from "@/components/ContentSection"
import { Hero } from "@/components/Hero"

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const portfolioRaw = await readContentFile<{
    projects: PortfolioEntry[]
  }>("content/portfolio/projects.yaml")
  
  return portfolioRaw.data.projects.map((item) => ({
    slug: item.slug,
  }))
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params
  
  const portfolioRaw = await readContentFile<{
    projects: PortfolioEntry[]
  }>("content/portfolio/projects.yaml")
  
  const entry = portfolioRaw.data.projects.find(
    project => project.slug === slug
  )

  if (!entry) {
    notFound()
  }    

  return (
    <>
      <Hero title={entry.title} />
      <ContentSection>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {entry.image && (
              <div className="flex justify-center mb-4">
                <Image 
                  src={entry.image} 
                  alt={entry.title} 
                  width={0}
                  height={0}
                  sizes="400px"
                  className="w-[400px] h-auto object-contain" 
                />
              </div>
            )}
            <p>{entry.description}</p>
          </div>
          <div className="lg:w-1/3">
            <ProjectDetailCard entry={entry} />
          </div>
        </div>
      </ContentSection> 
    </>
  )
}

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
    workshops: PortfolioEntry[]
  }>("content/portfolio/workshops.yaml")
  
  return portfolioRaw.data.workshops.map((item) => ({
    slug: item.slug,
  }))
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params
  
  const portfolioRaw = await readContentFile<{
    workshops: PortfolioEntry[]
  }>("content/portfolio/workshops.yaml")
  
  const entry = portfolioRaw.data.workshops.find(
    workshop => workshop.slug === slug
  )

  if (!entry) {
    notFound()
  }    

  return (
    <>
    <Hero title={entry.title} />
    <ContentSection>
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="prose prose-lg text-xl max-w-none lg:w-2/3 flex flex-col items-center">
          {entry.image && (
            <Image 
              src={entry.image} 
              alt={entry.title} 
              width={0}
              height={0}
              sizes="400px"
              className="w-[400px] h-auto object-contain" 
            />
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

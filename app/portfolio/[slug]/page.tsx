import React from "react"
import { readContentFile } from "@/lib/content-utils"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { ProjectDetailCard } from "@/components/card/ProjectDetailCard"
import { ButtonLink } from "@/components/button/ButtonLink"
import { notFound } from "next/navigation"
import Image from "next/image"

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
      <section className="w-full py-16 px-6 sm:px-8 lg:px-24 md:px-12 xl:px-40 even:bg-neutral-50">
        <ButtonLink href="/portfolio" variant="primary_outlined" size="md" external={false}>
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
      </section>
  )
}

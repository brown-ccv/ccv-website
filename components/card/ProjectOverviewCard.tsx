import React from "react"
import Image from "next/image"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/button/ButtonLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { TechnicalExpertiseHeader } from "@/components/TechnicalExpertiseHeader"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
  portfolioType: string
}

export function ProjectOverviewCard({ entry, portfolioType }: ProjectOverviewCardProps) {
  return (
    <Card className="w-full max-w-lg bg-white relative flex flex-col gap-4">
         {entry.image && (
           <div className="w-full h-96 relative overflow-hidden">
             <Image 
               src={entry.image} 
               alt={entry.title} 
               fill 
               className="object-cover" 
             />
           </div>
         )}
      <CardHeader className="py-2">
        <div className="flex items-center justify-between">
          <TechnicalExpertiseHeader expertiseType={entry['project-type']} />
          {entry.starred && (
            <Badge color="sunglow" className="text-black text-md">
              ⭐ Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardTitle className="text-center text-3xl border-t border-gray-300 py-6 flex flex-col gap-2">
          {entry.title}
          {entry.department && (
            <CardDescription className="text-center text-neutral-500 text-md italic">{entry.department}</CardDescription> 
          )}
        </CardTitle>  
        <div className="mt-auto pt-4 flex justify-center">
          <ButtonLink href={`/portfolio/${portfolioType}/${entry.slug}`} variant="primary_filled" size="md" external={false}>
            Learn More
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}

import React from "react"
import Image from "next/image"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/button/ButtonLink"
import { StyledCard } from "@/components/card/StyledCard"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { TechnicalExpertiseHeader } from "@/components/TechnicalExpertiseHeader"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
  portfolioType: string
}

export function ProjectOverviewCard({ entry, portfolioType }: ProjectOverviewCardProps) {
  return (
    <StyledCard size="sm" >
      <CardHeader>
        <div className="flex items-center justify-between">
          <TechnicalExpertiseHeader expertiseType={entry['project-type']} />
          {entry.starred && (
            <Badge color="sunglow">
              ⭐ Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      {entry.image && (
        <div className="w-full h-64 relative overflow-hidden">
          <Image 
            src={entry.image} 
            alt={entry.title} 
            fill 
            className="object-cover" 
          />
        </div>
      )}
      <CardTitle className="flex flex-col items-center justify-center gap-2 border-b border-gray-300 py-4 text-center">
        {entry.title}
        {entry.department && (
          <p className="text-sm font-thinner italic text-center text-slate-500">
            {entry.department}
          </p> 
        )}
      </CardTitle>
      <CardContent className="flex justify-center">
        <ButtonLink 
          href={`/portfolio/${portfolioType}/${entry.slug}`} 
          variant="primary_filled" 
          size="md" 
          external={false}
        >
          Learn More
        </ButtonLink>
      </CardContent>
    </StyledCard>
  )
} 

"use client"

import React from "react"
import Image from "next/image"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { IconButton } from "@/components/button/IconButton"
import { StyledCard } from "@/components/card/StyledCard"
import { CardHeader, CardTitle } from "@/components/ui/Card"
import { TechnicalExpertiseHeader } from "@/components/TechnicalExpertiseHeader"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
  portfolioType: string
}

export function ProjectOverviewCard({ entry, portfolioType }: ProjectOverviewCardProps) {

  return (
    <StyledCard
      size="custom"
      className="w-96 relative"
      footer={
        <div className="relative w-full">
          <span className="block text-lg pr-10 pb-0">{entry.title}</span>
          <IconButton
            iconName="FaExternalLinkAlt"
            variant="icon_only"
            size="icon-sm"
            onClick={() => {
              window.location.href = `/portfolio/${portfolioType}/${entry.slug}`
            }}
            aria-label="Learn more about this project"
            className="absolute bottom-0 right-0 hover:text-keppel-600"
          />
        </div>
      }
    >
      <CardHeader className="px-0 pb-0">
        <div className="flex items-center justify-between">
          <TechnicalExpertiseHeader expertiseType={entry['project-type']} />
          <div className="flex items-center gap-2">
            {entry.starred && (
              <Badge color="sunglow">
                ⭐ Featured
              </Badge>
            )}
          </div>
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
      {entry.department && (
        <p className="text-sm font-thinner italic text-center text-slate-500">
          {entry.department}
        </p> 
      )}
    </StyledCard>
  )
} 

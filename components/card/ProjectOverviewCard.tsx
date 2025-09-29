"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { StyledCard } from "@/components/card/StyledCard"
import { CardHeader, CardTitle } from "@/components/ui/Card"
import { TechnicalExpertiseHeader } from "@/components/TechnicalExpertiseHeader"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
  portfolioType: string
}

export function ProjectOverviewCard({ entry, portfolioType }: ProjectOverviewCardProps) {

  return (
    <Link href={`/portfolio/${portfolioType}/${entry.slug}`} className="block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-keppel-500 rounded-xl cursor-pointer">
      <StyledCard
        size="custom"
        className="w-96 relative"
        footer={
          <CardTitle className="border-0 py-4 text-center text-neutral-800 hover:text-neutral-800">
            {entry.title}
            {entry.department && (
              <p className="text-sm font-thinner italic text-center text-slate-500 !m-0">
                {entry.department}
              </p>
            )}
          </CardTitle>
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
      </StyledCard>
    </Link>
  )
} 

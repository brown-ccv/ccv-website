import React from "react"
import Image from "next/image"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/button/ButtonLink"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
}

export function ProjectOverviewCard({ entry }: ProjectOverviewCardProps) {
  return (
    <Card className="w-full max-w-sm bg-white relative flex flex-col gap-4">
         {entry.image && (
           <Image src={entry.image} alt={entry.title} width={100} height={100} className="w-full h-auto" />
         )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge color="blue" className="text-white">
            {entry['project-type']}
          </Badge>
          {entry.starred && (
            <Badge color="sunglow" className="text-black">
              ⭐ Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-center text-3xl border-b border-gray-300 py-4">
           {entry.title}
         </CardTitle>
      </CardHeader>
      <CardContent className="text-xl flex-1 flex flex-col">
         <div className="mt-auto pt-4 flex justify-center">
          <ButtonLink href={`/portfolio/${entry.slug}`} variant="primary_filled" size="md" external={false}>
            Learn More
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}

import React from "react"
import Image from "next/image"
import { PortfolioEntry } from "@/lib/portfolio-types"
import { Badge } from "@/components/ui/Badge"
import { ButtonLink } from "@/components/button/ButtonLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"

interface ProjectOverviewCardProps {
  entry: PortfolioEntry
}

export function ProjectOverviewCard({ entry }: ProjectOverviewCardProps) {
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
        <div className="flex items-center justify-center">
          <Badge color="blue" className="text-white">
            {entry['project-type']}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardTitle className="text-center text-3xl border-t border-gray-300 py-6 flex flex-col gap-2">
          {entry.title}
          {entry.department && (
            <CardDescription className="text-center text-neutral-500">{entry.department}</CardDescription> 
          )}
        </CardTitle>  
        <div className="mt-auto pt-4 flex justify-center">
          <ButtonLink href={`/portfolio/${entry.slug}`} variant="primary_filled" size="md" external={false}>
            Learn More
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  )
}

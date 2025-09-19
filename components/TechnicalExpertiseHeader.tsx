import React from "react"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/RenderIcon"

// Icon mapping for Expertise Types on Project Consulting page
const iconMap: Record<string, string> = {
  "Data Science": "FaAtom",
  "Software Engineering": "FaCode",
  "Computational Biology": "FaDna",
  "High-Performance Computing": "FaRocket",
  "Software Sustainability": "FaTree",
  "3D Visualization": "FaCube",
  "Hardware Consultation": "FaCog",
  "Artificial Intelligence": "FaRobot",
}

interface TechnicalExpertiseProps {
  expertiseType: string
  className?: string
}

export function TechnicalExpertiseHeader({ 
  expertiseType, 
  className,
}: TechnicalExpertiseProps) {
  const iconName = iconMap[expertiseType]
  
  return (
    <div className={cn("flex items-start gap-2 text-lg", className)}>
      {iconName && <Icon iconName={iconName} className="mt-1" />}
      <span>{expertiseType}</span>
    </div>
  )
}

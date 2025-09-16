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
    <div className={cn("flex items-center gap-2", className)}>
      {iconName && <Icon iconName={iconName} className="text-keppel-700 text-lg" />}
      <span>{expertiseType}</span>
    </div>
  )
}

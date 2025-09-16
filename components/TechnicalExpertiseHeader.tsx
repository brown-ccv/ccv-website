import React from "react"
import { cn } from "@/lib/utils"
import { 
  FaAtom, 
  FaCode, 
  FaDna, 
  FaRocket, 
  FaTree, 
  FaCube, 
  FaCog, 
  FaRobot 
} from "react-icons/fa"

// Icon mapping for service types
const iconMap: Record<string, any> = {
  "Data Science": FaAtom,
  "Software Engineering": FaCode,
  "Computational Biology": FaDna,
  "High-Performance Computing": FaRocket,
  "Software Sustainability": FaTree,
  "3D Visualization": FaCube,
  "Hardware Consultation": FaCog,
  "Artificial Intelligence": FaRobot,
}

interface TechnicalExpertiseProps {
  expertiseType: string
  className?: string
}

export function TechnicalExpertiseHeader({ 
  expertiseType, 
  className,
}: TechnicalExpertiseProps) {
  const icon = iconMap[expertiseType]
  
  if (!icon) {
    return <span>{expertiseType}</span>
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {React.createElement(icon, {  })}
      <span >{expertiseType}</span>
    </div>
  )
}

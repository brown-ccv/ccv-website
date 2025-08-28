import React from "react"
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
  iconClassName?: string
  textClassName?: string
}

export function TechnicalExpertiseHeader({ 
  expertiseType, 
  className = "", 
  iconClassName = "", 
  textClassName = "" 
}: TechnicalExpertiseProps) {
  const icon = iconMap[expertiseType]
  
  if (!icon) {
    return <span className={`text-2xl font-bold text-neutral-900 ${textClassName}`}>{expertiseType}</span>
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {React.createElement(icon, { className: `text-3xl text-neutral-700 ${iconClassName}` })}
      <span className={`text-xl font-bold text-neutral-900 ${textClassName}`}>{expertiseType}</span>
    </div>
  )
}

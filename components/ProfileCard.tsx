import React from "react"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  icon?: React.ReactNode
  name: string
  organization: string
  className?: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  icon,
  name,
  organization,
  className,
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {icon && <div className="w-6 h-6 mr-3">{icon}</div>}
      <p className="font-normal text-black text-lg leading-snug mt-3">
        {name}
        <br />
        {organization}
      </p>
    </div>
  )
}

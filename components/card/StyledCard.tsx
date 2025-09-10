import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import React from "react"
import { cn } from "@/lib/utils"

interface StyledCardProps {
  iconName?: string
  isDisabled?: boolean
  title: string
  className?: string
  children: React.ReactNode
}

export const StyledCard: React.FC<StyledCardProps> = ({
  iconName,
  isDisabled = false,
  title,
  className = "max-w-sm",
  children,
}) => {
  const IconComponent = iconName ? Icon : null
  return (
    <Card
      className={cn(
        className,
        "w-full bg-white",
        isDisabled ? "opacity-30 grayscale" : ""
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4 border-b border-slate-300 py-4">
          {IconComponent && (
            <IconComponent
              iconName={iconName}
              className="mt-1 flex-shrink-0"
            />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

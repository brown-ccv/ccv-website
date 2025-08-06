import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import React from "react"
import { cn } from "@/lib/utils"

interface StyledCardProps {
  iconName?: string
  isDisabled?: boolean
  title: string
  children: React.ReactNode
}

export const StyledCard: React.FC<StyledCardProps> = ({
  iconName,
  isDisabled = false,
  title,
  children,
}) => {
  const IconComponent = iconName ? Icon : null
  return (
    <Card
      className={cn(
        "w-full max-w-sm bg-white",
        isDisabled ? "opacity-30 grayscale" : ""
      )}
    >
      <CardHeader>
        <CardTitle className="flex gap-4 items-center justify-center text-3xl border-b border-gray-300 py-4">
          {IconComponent && (
            <IconComponent
              iconName={iconName}
              className="text-4xl flex-shrink-0 mt-1"
            />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{children}</CardContent>
    </Card>
  )
}

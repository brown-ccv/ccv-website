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
  children,
  className,
}) => {
  const IconComponent = iconName ? Icon : null
  return (
    <Card
      className={cn(
        "w-full md:max-w-md bg-white px-6",
        isDisabled ? "opacity-30 grayscale" : "",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4 border-b border-gray-300 py-4 text-3xl">
          {IconComponent && (
            <IconComponent
              iconName={iconName}
              className="mt-1 flex-shrink-0 text-2xl"
            />
          )}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{children}</CardContent>
    </Card>
  )
}

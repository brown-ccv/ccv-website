import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import React from "react"
import { cn } from "@/lib/utils"
import { CardVariants } from "@/components/card/variants"
import { VariantProps } from "class-variance-authority"

interface StyledCardProps extends VariantProps<typeof CardVariants> {
  iconName?: string
  isDisabled?: boolean
  title?: string
  className?: string
  children: React.ReactNode
}

export const StyledCard: React.FC<StyledCardProps> = ({
  iconName,
  isDisabled = false,
  title,
  className,
  size,
  children,
}) => {
  const IconComponent = iconName ? Icon : null
  return (
    <Card
      className={cn(
        CardVariants({
          size,
          className,
        }),
        isDisabled ? "opacity-30 grayscale" : ""
      )}
    >
      {title && (
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4 border-b border-gray-300 py-4 text-center">
            {IconComponent && (
              <IconComponent
                iconName={iconName}
                className="mt-1 flex-shrink-0 text-2xl"
              />
            )}
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>      
        <div className="prose prose-sm lg:prose-base max-w-none">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import React from "react"
import { cn } from "@/lib/utils"
import { CardVariants } from "@/components/card/variants"
import { VariantProps } from "class-variance-authority"

type HeaderColor = "basic" | "plus" | "premium"

export interface StyledCardProps extends VariantProps<typeof CardVariants> {
  iconName?: string
  isDisabled?: boolean
  title?: string
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
  headerColor?: HeaderColor
}

export const StyledCard: React.FC<StyledCardProps> = ({
  iconName,
  isDisabled = false,
  title,
  className,
  size,
  children,
  footer,
  headerColor,
}) => {
  const IconComponent = iconName ? Icon : null

  const headerColorClass: Record<HeaderColor, string> = {
    basic: "bg-gray-200",
    plus: "bg-keppel-500",
    premium: "bg-sunglow-400",
  }

  const titleClassName = cn(
    "flex items-center justify-center gap-4 border-b border-gray-300 py-4 text-center rounded-md text-black",
    headerColor ? headerColorClass[headerColor] : undefined
  )
  return (
    <Card
      className={cn(
        CardVariants({
          size,
          className,
        }),
        isDisabled ? "opacity-30 grayscale" : "",
        "flex flex-col"
      )}
    >
      {title && (
        <CardHeader className="flex-shrink-0">
          <CardTitle className={titleClassName}>
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
      <CardContent className="flex-grow pt-0">
        <div className="prose prose-sm max-w-none lg:prose-base">
          {children}
        </div>
      </CardContent>
      {footer && (
        <CardFooter className="mt-auto flex flex-shrink-0 flex-col items-center gap-2">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

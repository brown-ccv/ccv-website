import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import React from "react"
import { StyledCardProps } from "@/components/card/StyledCard"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import Icon from "@/components/ui/RenderIcon"
import { CardVariants } from "@/components/card/variants"

export const CollapsableCard: React.FC<StyledCardProps> = ({
  iconName,
  isDisabled = false,
  title,
  className,
  size,
  children,
  footer,
}) => {
  const IconComponent = iconName ? Icon : null
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
      <Accordion type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          {title && (
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-center gap-4 border-b border-gray-300 text-center">
                {IconComponent && (
                  <IconComponent
                    iconName={iconName}
                    className="mt-1 flex-shrink-0 text-2xl"
                  />
                )}
                <AccordionTrigger className="py-0 font-bold leading-none tracking-tight">
                  {title}
                </AccordionTrigger>
              </CardTitle>
            </CardHeader>
          )}
          <CardContent className="flex-grow pt-0">
            <AccordionContent className="prose prose-sm max-w-none lg:prose-base">
              {children}
            </AccordionContent>
          </CardContent>
          {footer && (
            <CardFooter className="mt-auto flex flex-shrink-0 flex-col items-center gap-2">
              {footer}
            </CardFooter>
          )}
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

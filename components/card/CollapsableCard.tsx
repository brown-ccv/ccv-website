import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/StyledAccordion"
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

interface CollapsableCardProps extends StyledCardProps {
  id: string
}

export function CollapsableCard({
  id,
  iconName,
  isDisabled = false,
  title,
  className,
  size,
  children,
  footer,
}: CollapsableCardProps) {
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
        <AccordionItem className="border-none p-4" value={id}>
          {title && (
            <CardHeader className="flex-shrink-0">
              <CardTitle>
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
          <CardContent className="flex-grow p-0">
            <AccordionContent className="max-w-none">
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

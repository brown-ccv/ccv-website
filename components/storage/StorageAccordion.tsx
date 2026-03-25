import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/StyledAccordion"
import React from "react"

export function StorageAccordion({
  title,
  children,
  id,
}: {
  title: string
  children: React.ReactNode
  id: string
}) {
  return (
    <AccordionItem className="lg:mx-6" value={id}>
      <AccordionTrigger className="py-2 text-md font-semibold lg:py-4">
        {title}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}

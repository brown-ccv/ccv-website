import React from "react"
import {
  ContentHeader,
  ContentSection,
  ContentSubHeader,
  ContentTitle,
} from "@/components/ContentSection"
import { ButtonLink } from "@/components/button/ButtonLink"
import { cn } from "@/lib/utils"

interface LocationSectionProps {
  className?: string
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  className,
}) => {
  return (
    <ContentSection
      className={cn(
        "lg:items-center lg:py-0 lg:pr-0 xl:py-0 xl:pr-0",
        className
      )}
      align="left"
    >
      <ContentHeader>
        <ContentTitle title="Our Home" />
        <ContentSubHeader>
          <p>
            Our office is located at <strong>180 George Street</strong> on
            Brown's main campus in Providence's College Hill neighborhood.
          </p>
          <p>
            Built in 1960 and dedicated to Thomas J. Watson in 1961, the
            building was designed by architect Philip Johnson to house the IBM
            7070 computer.
          </p>
          <p>
            Today, it hosts the Center for Computation and Visualization,
            supporting research at Brown.
          </p>
          <ButtonLink
            variant="primary_filled"
            size="md"
            href="https://en.wikipedia.org/wiki/Brown_University_Computing_Laboratory"
            className="mx-auto my-2 w-auto"
          >
            Brown University Computing Laboratory
          </ButtonLink>
        </ContentSubHeader>
      </ContentHeader>
      <iframe
        title="Map of 180 George Street"
        className="min-w-1/2 w-full flex-shrink-0 lg:w-1/2"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.109984207845!2d-71.40139708797392!3d41.82592977112757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4453b3f867125%3A0xe3d14e16820236d9!2s180%20George%20Street%2C%20180%20George%20St%2C%20Providence%2C%20RI%2002906!5e0!3m2!1sen!2sus!4v1747770863560!5m2!1sen!2sus"
        height="700"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </ContentSection>
  )
}

import React from "react"
import { ContentSection } from "@/components/ContentSection"
import { SectionHeader } from "@/components/SectionHeader"

interface LocationSectionProps {
  title?: string
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  title = "180 George St",
}) => {
  //class="w-full py-16 px-6 sm:px-8 lg:px-24 md:px-12 xl:px-40 odd:bg-neutral-50"
  return (
    <ContentSection
      title={title}
      align={"left"}
      className="lg:px-0 lg:py-0 xl:pr-0 xl:py-0"
    >
      <div className="flex flex-col xl:flex-row gap-4 lg:gap-8">
        <div className="flex flex-col gap-y-4 text-xl lg:px-24 xl:px-0 xl:w-1/2">
          <SectionHeader title={title} />
          <p>
            Our office is on Brown's main campus in Providence's College Hill
            neighborhood.
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
        </div>
        <iframe
          title={"Map of 180 George Street"}
          className="xl:w-1/2"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.109984207845!2d-71.40139708797392!3d41.82592977112757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4453b3f867125%3A0xe3d14e16820236d9!2s180%20George%20Street%2C%20180%20George%20St%2C%20Providence%2C%20RI%2002906!5e0!3m2!1sen!2sus!4v1747770863560!5m2!1sen!2sus"
          height="700"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </ContentSection>
  )
}

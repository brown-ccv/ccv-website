import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { ContentSection } from "@/components/ui/content-section"

interface LocationSectionProps {
  title?: string
  description?: string
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  title = "180 George St",
  description = "Our office is on Brown's main campus in Providence's College Hill neighborhood. Built in 1960 and dedicated to Thomas J. Watson in 1961, the building was designed by architect Philip Johnson to house the IBM 7070 computer. Today, it hosts the Center for Computation and Visualization, supporting research at Brown.",
}) => {
  return (
    <ContentSection>
      <div className="flex flex-col xl:flex-row gap-4">
        <Card className="w-full xl:w-1/2 shadow-none rounded-none border-none">
          <CardContent className="flex items-center">
            <div className="w-full m-0 p-0">
              <SectionHeader title={title} align="center" />
              <p className="text-black text-xl">{description}</p>
            </div>
          </CardContent>
        </Card>
        <div className="w-full xl:w-1/2">
          <iframe
            title={"Map of 180 George Street"}
            className="w-full -mt-2 xl:-my-24 block xl:w-[calc(100%+9rem)] xl:-mr-36"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.109984207845!2d-71.40139708797392!3d41.82592977112757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4453b3f867125%3A0xe3d14e16820236d9!2s180%20George%20Street%2C%20180%20George%20St%2C%20Providence%2C%20RI%2002906!5e0!3m2!1sen!2sus!4v1747770863560!5m2!1sen!2sus"
            height="700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </ContentSection>
  )
}

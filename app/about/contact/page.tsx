import React from "react"
import ContactContent from "@/content/about/contact.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"
import { LocationSection } from "@/components/LocationSection"
import { ContentSection } from "@/components/ui/ContentSection"

export default async function ContactUs() {
  const metadata = getMDXMetadata("content/about/contact.mdx")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <ContentSection>
        <div className="prose prose-lg text-xl max-w-none">
          <ContactContent />
        </div>
      </ContentSection>
      <LocationSection />
    </>
  )
}

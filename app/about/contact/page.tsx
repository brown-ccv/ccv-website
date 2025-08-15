import React from "react"
import ContactContent from "@/content/about/contact.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"
import { LocationSection } from "@/components/LocationSection"

export default async function ContactUs() {
  const metadata = getMDXMetadata("content/about/contact.mdx")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <div className="prose prose-lg max-w-none text-xl">
        <ContactContent />
      </div>
      <LocationSection />
    </>
  )
}

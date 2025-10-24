import React from "react"
import ContactContent from "@/content/about/help.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"

export default async function ContactUs() {
  const metadata = getMDXMetadata("content/about/help.mdx")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <ContactContent />
    </>
  )
}

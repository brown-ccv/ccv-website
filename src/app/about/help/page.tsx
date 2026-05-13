import React from "react"
import ContactContent from "@/content/routes/about/help.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import { Hero } from "@/components/Hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help",
}
export default async function ContactUs() {
  const metadata = getMDXMetadata("src/content/routes/about/help.mdx")

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

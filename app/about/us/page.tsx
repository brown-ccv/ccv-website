import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/routes/about/us.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function AboutUs() {
  const metadata = getMDXMetadata("content/routes/about/us.mdx")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <AboutUsContent />
    </>
  )
}

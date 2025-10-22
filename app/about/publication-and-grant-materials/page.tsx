import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/about/publication-and-grant-materials.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function PublicationAndGrantMaterials() {
  const metadata = getMDXMetadata(
    "content/about/publication-and-grant-materials.mdx"
  )

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

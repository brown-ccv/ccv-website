import React from "react"
import { Hero } from "@/components/Hero"
import MaterialsForPublicationsAndGrantsContent from "@/content/about/materials-for-publications-and-grants.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function PublicationAndGrantMaterials() {
  const metadata = getMDXMetadata(
    "content/about/materials-for-publications-and-grants.mdx"
  )

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <MaterialsForPublicationsAndGrantsContent />
    </>
  )
}

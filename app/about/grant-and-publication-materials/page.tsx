import React from "react"
import { Hero } from "@/components/Hero"
import GrantAndPublicationMaterialsContent from "@/content/about/grant-and-publication-materials.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function PublicationAndGrantMaterials() {
  const metadata = getMDXMetadata(
    "content/about/grant-and-publication-materials.mdx"
  )

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <GrantAndPublicationMaterialsContent />
    </>
  )
}

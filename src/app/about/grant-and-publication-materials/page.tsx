import React from "react"
import { Hero } from "@/components/Hero"
import GrantAndPublicationMaterialsContent from "@/content/routes/about/grant-and-publication-materials.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grant and Publication Materials",
}
export default async function PublicationAndGrantMaterials() {
  const metadata = getMDXMetadata(
    "src/content/routes/about/grant-and-publication-materials.mdx"
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

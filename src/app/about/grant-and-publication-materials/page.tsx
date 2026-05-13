import React from "react"
import { Hero } from "@/components/Hero"
import GrantAndPublicationMaterialsContent from "@/content/routes/about/grant-and-publication-materials.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata(
  "src/content/routes/about/grant-and-publication-materials.mdx"
)
export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default async function PublicationAndGrantMaterials() {
  return (
    <>
      <Hero
        image={frontMatter.image}
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <GrantAndPublicationMaterialsContent />
    </>
  )
}

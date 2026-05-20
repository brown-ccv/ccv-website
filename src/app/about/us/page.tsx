import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/routes/about/us.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/about/us.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default async function AboutUs() {
  return (
    <>
      <Hero
        image={frontMatter.image}
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <AboutUsContent />
    </>
  )
}

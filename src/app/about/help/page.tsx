import React from "react"
import ContactContent from "@/content/routes/about/help.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import { Hero } from "@/components/Hero"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/about/help.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}
export default async function ContactUs() {
  return (
    <>
      <Hero
        image={frontMatter.image}
        title={frontMatter.title}
        description={frontMatter.description}
      />
      <ContactContent />
    </>
  )
}

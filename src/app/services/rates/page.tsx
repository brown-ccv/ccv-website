import { Hero } from "@/components/Hero"
import RatesContent from "@/content/routes/services/rates.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata("src/content/routes/services/rates.mdx")

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default async function Rates() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <RatesContent />
    </>
  )
}

import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/about/about-us.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function AboutUs() {
  const metadata = getMDXMetadata("content/about/about-us.mdx")

  return (
    <>
      <Hero
        image={"/images/hero/about-kayaks.png"}
        title={metadata.title}
        description={metadata.description}
      />
      <div className="prose prose-lg text-xl max-w-none">
        <AboutUsContent />
      </div>
    </>
  )
}

import { Hero } from "@/components/Hero"
import AIOscarContent from "@/content/routes/ai/ai-oscar.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI on Oscar",
}
export default function AIOscar() {
  const metadata = getMDXMetadata("src/content/routes/ai/ai-oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <AIOscarContent />
    </>
  )
}

import { Hero } from "@/components/Hero"
import RatesContent from "@/content/services/rates.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function Rates() {
  const metadata = getMDXMetadata("content/services/rates.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <RatesContent />
    </>
  )
}

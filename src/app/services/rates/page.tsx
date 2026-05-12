import { Hero } from "@/components/Hero"
import RatesContent from "@/content/routes/services/rates.mdx"
import { getMDXMetadata } from "@/utils/mdx"

export default async function Rates() {
  const metadata = getMDXMetadata("src/content/routes/services/rates.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <RatesContent />
    </>
  )
}

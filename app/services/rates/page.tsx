import { Hero } from "@/components/Hero"
import { ContentSection } from "@/components/ContentSection"
import RatesContent from "@/content/services/rates.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function RatesSupport() {
  const metadata = getMDXMetadata("content/services/rates.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <div className="prose prose-lg text-xl max-w-none">
        <RatesContent />
      </div>
    </>
  )
}

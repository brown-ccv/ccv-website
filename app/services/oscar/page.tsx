import { Hero } from "@/components/Hero"
import OscarContent from "@/content/services/oscar.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default async function Oscar() {
  const metadata = getMDXMetadata("content/services/oscar.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <div className="prose prose-lg max-w-none text-xl">
        <OscarContent />
      </div>
    </>
  )
}

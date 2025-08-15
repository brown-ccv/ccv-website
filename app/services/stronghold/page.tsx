import { Hero } from "@/components/Hero"
import StrongholdContent from "@/content/services/stronghold.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata("content/services/stronghold.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <div className="prose prose-lg max-w-none text-xl">
        <StrongholdContent />
      </div>
    </>
  )
}

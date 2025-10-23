import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/services/workshops.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function UserSupport() {
  const metadata = getMDXMetadata("content/services/workshops.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <UserSupportContent />
    </>
  )
}

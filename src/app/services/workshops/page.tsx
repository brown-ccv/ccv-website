import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/routes/services/workshops.mdx"
import { getMDXMetadata } from "@/utils/mdx"

export default function UserSupport() {
  const metadata = getMDXMetadata("src/content/routes/services/workshops.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <UserSupportContent />
    </>
  )
}

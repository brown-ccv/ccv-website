import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/services/user-support.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function UserSupport() {
  const metadata = getMDXMetadata("content/services/user-support.mdx")

  return (
    <>
      <Hero
        title={metadata.title}
        description={metadata.description}
      />
      <UserSupportContent />
    </>
  )
}

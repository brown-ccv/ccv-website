import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/services/user-support.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata("content/services/user-support.mdx")

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <UserSupportContent />
    </>
  )
}

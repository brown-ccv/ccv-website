import { Hero } from "@/components/Hero"
import UserSupportContent from "@/content/services/user-support.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function UserSupport() {
  const metadata = getMDXMetadata("content/services/user-support.mdx")

  return (
    <>
      <Hero
        image={"/images/services/user-support.jpeg"}
        title={metadata.title}
        description={metadata.description}
      />
      <div className="prose prose-lg text-xl max-w-none">
        <UserSupportContent />
      </div>
    </>
  )
}

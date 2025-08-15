import { Hero } from "@/components/Hero"
import VirtualMachineContent from "@/content/services/virtual-machine-hosting.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"

export default function Page() {
  const metadata = getMDXMetadata(
    "content/services/virtual-machine-hosting.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <VirtualMachineContent />
    </>
  )
}

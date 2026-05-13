import { Hero } from "@/components/Hero"
import VirtualMachineContent from "@/content/routes/services/virtual-machine-hosting.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Virtual Machine Hosting",
}
export default function VirtualMachineHosting() {
  const metadata = getMDXMetadata(
    "src/content/routes/services/virtual-machine-hosting.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description} />
      <VirtualMachineContent />
    </>
  )
}

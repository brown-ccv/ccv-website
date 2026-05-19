import { Hero } from "@/components/Hero"
import VirtualMachineContent from "@/content/routes/services/virtual-machine-hosting.mdx"
import { getMDXMetadata } from "@/utils/mdx"
import type { Metadata } from "next"

const frontMatter = getMDXMetadata(
  "src/content/routes/services/virtual-machine-hosting.mdx"
)

export const metadata: Metadata = {
  title: frontMatter.title,
  description: frontMatter.description,
}

export default function VirtualMachineHosting() {
  return (
    <>
      <Hero title={frontMatter.title} description={frontMatter.description} />
      <VirtualMachineContent />
    </>
  )
}

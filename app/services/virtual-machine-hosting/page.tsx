import { Hero } from "@/components/Hero"
import VirtualMachineContent from "@/content/services/virtual-machine-hosting.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import ButtonLink from "@/components/button/ButtonLink"

export default function VirtualMachineHosting() {
  const metadata = getMDXMetadata(
    "content/services/virtual-machine-hosting.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="primary_filled"
          external={true}
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/12/create/200"
        >
          Request Virtual Hosting
        </ButtonLink>
      </Hero>
      <VirtualMachineContent />
    </>
  )
}

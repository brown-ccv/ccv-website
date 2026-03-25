import React from "react"
import { Hero } from "@/components/Hero"
import { getMDXMetadata } from "@/lib/mdx-utils"
import StorageContent from "@/content/routes/services/file-storage-and-transfer.mdx"

import { ButtonLink } from "@/components/button/ButtonLink"
import { ScrollButton } from "@/components/button/ScrollButton"
import Icon from "@/components/ui/RenderIcon"

export default async function CompareStorageOptions() {
  const metadata = getMDXMetadata(
    "content/routes/services/file-storage-and-transfer.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/16"
        >
          Request Storage
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/16/group/55/create/262"
        >
          Request Quota Change
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://brown.atlassian.net/servicedesk/customer/portal/16/group/55/create/217"
        >
          Storage Help
        </ButtonLink>
        <ScrollButton
          variant="primary_filled"
          size="lg"
          id="table"
          aria-describedby="table-nav-desc"
          aria-label="Scroll to comparison table section"
        >
          Compare Storage
          <Icon iconName="FaAngleDoubleDown" aria-hidden="true" />
        </ScrollButton>
      </Hero>
      <StorageContent />
    </>
  )
}

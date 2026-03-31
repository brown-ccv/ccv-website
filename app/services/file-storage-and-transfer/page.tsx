import React from "react"
import { Hero } from "@/components/Hero"
import { getMDXMetadata } from "@/lib/mdx-utils"
import StorageContent from "@/content/routes/services/file-storage-and-transfer.mdx"

import { ButtonLink } from "@/components/button/ButtonLink"
import { ScrollButton } from "@/components/button/ScrollButton"
import Icon from "@/components/ui/RenderIcon"
import { TABLE_VISIBILITY } from "@/lib/styles"

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
        <ButtonLink
          variant="primary_filled"
          size="lg"
          href="/services/rates#research-data-storage"
          // NOTE: Amar requested this link to open a new page which is against the norm of internal links
          target="_blank"
          rel="noopener noreferrer"
        >
          Storage Rates
        </ButtonLink>
        <ScrollButton
          variant="primary_filled"
          size="lg"
          id="table"
          className={TABLE_VISIBILITY}
          aria-describedby="table-nav-desc"
          aria-label="Scroll to comparison table section"
        >
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            Compare Storage
            <Icon iconName="FaAngleDoubleDown" />
          </span>
        </ScrollButton>
      </Hero>
      <StorageContent />
    </>
  )
}

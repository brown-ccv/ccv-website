import React from "react"
import { Hero } from "@/components/Hero"
import { getMDXMetadata } from "@/utils/mdx"
import StorageContent from "@/content/routes/services/file-storage-and-transfer.mdx"

import { ButtonLink } from "@/components/button/ButtonLink"
import { ScrollButton } from "@/components/button/ScrollButton"
import Icon from "@/components/ui/RenderIcon"
import { TABLE_VISIBILITY } from "@/styles/visibility"

export default async function CompareStorageOptions() {
  const metadata = getMDXMetadata(
    "src/content/routes/services/file-storage-and-transfer.mdx"
  )

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://www.help.brown.edu/servicedesk/customer/portal/16/group/-1"
        >
          Storage Help
        </ButtonLink>
        <ButtonLink
          variant="secondary_filled"
          size="lg"
          href="https://docs.ccv.brown.edu/storage-and-transfer"
          aria-label="File Storage and Transfer Documentation"
        >
          Documentation
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
          id="compare-storage-options"
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

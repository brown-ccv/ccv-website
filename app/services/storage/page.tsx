import React from "react"
import StorageContent from "@/content/services/storage.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"
import ButtonLink from "@/components/button/ButtonLink"

export default async function Storage() {
  const metadata = getMDXMetadata("content/services/storage.mdx")

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        {metadata.links?.map((link: any, index: number) => (
          <ButtonLink
            key={index}
            variant={
              link.category === "Documentation"
                ? "primary_filled"
                : "secondary_filled"
            }
            size="xl"
            href={link.target}
            external={!link.target.startsWith("/")}
          >
            {link.text}
          </ButtonLink>
        ))}
      </Hero>
      <StorageContent />
    </>
  )
}

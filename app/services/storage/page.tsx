import React from "react"
import StorageContent from "@/content/services/storage.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"
import ButtonLink from "@/components/button/ButtonLink"

export default async function Storage() {
  const metadata = getMDXMetadata("content/services/storage.mdx")
  const links = metadata.links || []

  return (
    <>
      <Hero title={metadata.title} description={metadata.description}>
        <div className="flex flex-col items-start not-prose">
          <div className="flex flex-col xl:flex-row flex-wrap gap-4 w-full items-start not-prose">
            {links.map((link: any, index: number) => (
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
          </div>
        </div>
      </Hero>
      <div className="prose prose-lg text-xl max-w-none">
        <StorageContent />
      </div>
    </>
  )
}

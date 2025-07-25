import React from "react"
import Link from "next/link"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { Hero } from "@/components/Hero"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { readContentFile } from "@/lib/content-utils"
import {
  PageContentData,
  ServiceConfig,
  ServiceLink,
} from "@/lib/storage-types"
import { humanize } from "@/lib/utils"
import ButtonLink from "@/components/ui/button-link"

const rawPageContent = await readContentFile(
  "content/services/storage/storage-tool.yaml"
)
const pageContent: PageContentData = rawPageContent.data as PageContentData
const heroLinks: ServiceLink[] = pageContent.links || []

export default async function Storage() {
  return (
    <div>
      <Hero title="Storage and Transfer" description={pageContent?.description}>
        <div className="flex flex-col items-start not-prose">
          <div className="flex flex-col xl:flex-row flex-wrap gap-2 w-full items-start not-prose">
            <ButtonLink
              href="/services/storage/compare"
              variant="primary_filled"
              external={false}
              size="xl"
              className="w-full xl:w-auto"
            >
              Compare Storage Options
            </ButtonLink>
            {heroLinks.map((link, index) => (
              <ButtonLink
                href={link.target}
                external={true}
                key={index}
                variant={
                  link.category === "Support"
                    ? "secondary_filled"
                    : "primary_filled"
                }
                size="xl"
                className="w-full xl:w-auto"
              >
                {link.text}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Hero>

      {pageContent.services.map(
        (serviceSection: ServiceConfig, index: number) => {
          const isEven = index % 2 === 0
          const sectionBgColor = isEven ? "bg-white" : "bg-neutral-50"

          return (
            <section
              key={serviceSection.name}
              id={serviceSection.name}
              className={`${sectionBgColor} py-16 sm:py-24 `}
            >
              <div className="px-14 lg:px-36">
                <SectionHeader
                  title={humanize(serviceSection.name)}
                  align="center"
                />
                <Card className="w-full border-none shadow-none rounded-none">
                  <CardContent className="flex flex-col items-start pb-8">
                    <div className="prose text-xl">
                      <Markdown
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                      >
                        {serviceSection.description}
                      </Markdown>
                    </div>
                    {serviceSection.links &&
                      serviceSection.links.length > 0 && (
                        <div className="mt-4 flex flex-row gap-2 w-full items-start not-prose">
                          {serviceSection.links.map((link, index) => {
                            const isExternal =
                              link.target.startsWith("http://") ||
                              link.target.startsWith("https://")
                            return (
                              <ButtonLink
                                href={link.target}
                                external={isExternal}
                                key={index}
                                variant="primary_filled"
                                size="xl"
                              >
                                {link.text}
                              </ButtonLink>
                            )
                          })}
                        </div>
                      )}
                  </CardContent>
                </Card>
              </div>
            </section>
          )
        }
      )}
    </div>
  )
}

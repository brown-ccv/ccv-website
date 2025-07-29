import React from "react"
import StorageContent from "@/content/services/storage.mdx"
import { getMDXMetadata } from "@/lib/mdx-utils"
import { Hero } from "@/components/Hero"
import { Button } from "@/components/ui/button"
import ExternalLink from "@/components/ui/external-link"
import { ContentSection } from "@/components/ui/content-section"

export default async function Storage() {
  const metadata = getMDXMetadata('content/services/storage.mdx');
  const links = metadata.links || [];

  return (
    <div>
      <Hero 
        title={metadata.title}
        description={metadata.description}
      >
        <div className="flex flex-col items-start not-prose">
          <div className="flex flex-col xl:flex-row flex-wrap gap-2 w-full items-start not-prose">
            {links.map((link: any, index: number) => (
              <Button
                key={index}
                variant={link.category === "Documentation" ? "primary_filled" : "secondary_filled"}
                size="xl"
                className="w-full xl:w-auto"
              >
                <ExternalLink 
                  href={link.target} 
                  external={!link.target.startsWith("/")}
                >
                  {link.text}
                </ExternalLink>
              </Button>
            ))}
          </div>
        </div>
      </Hero>

      <ContentSection>
        <div className='prose prose-lg text-xl max-w-none'>
          <StorageContent />
        </div>
      </ContentSection>
    </div>
  )
}
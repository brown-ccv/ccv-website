import React from "react"
import Link from "next/link"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Card, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { readContentFile } from "@/lib/content-utils"
import { PageContentData, ServiceConfig, ServiceLink } from "@/lib/storage-types"
import { humanize } from "@/lib/utils"

const rawPageContent = await readContentFile('content/services/storage/storage-tool.yaml');
const pageContent: PageContentData | null = rawPageContent ? (rawPageContent.data as PageContentData) : null;
const heroLinks: ServiceLink[] = pageContent?.links || [];

export default async function Storage() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-purple-900">
          <Hero image={"/images/hero/hero.jpeg"}>
            <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
              <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                <TextAnimate className="font-bold text-6xl md:text-8xl">
                  Campus Storage and Transfer
                </TextAnimate>
                <p className="text-4xl font-semibold">
                  {pageContent?.description}
                </p>
                <div className="mt-4 flex flex-row gap-2 w-full items-start not-prose">
                <Button variant="primary_filled" size="xl">
                  <Link href="/services/storage/compare">
                    Compare Storage Options
                  </Link>
                </Button>
                {heroLinks.map((link, index) => {
                  return (
                    <Button
                      key={index}
                      variant="secondary_filled"
                      size="xl"
                    >
                      <Link 
                        href={link.target} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {link.text}
                      </Link>
                    </Button>
                  );
                })}
              </div>
              </div>
            </div>
          </Hero>
        </div>
      </div>

      <div>
        {pageContent?.services.map((serviceSection: ServiceConfig, index: number) => {
          const isEven = index % 2 === 0;
          const sectionBgColor = isEven ? 'bg-white' : 'bg-neutral-50';

          return(
            <section key={serviceSection.name} id={serviceSection.name} className={`${sectionBgColor} py-16 sm:py-24 `} >
              <div className="px-14 lg:px-36">
              <SectionHeader title={humanize(serviceSection.name)} align="center" />
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
                  {serviceSection.links && serviceSection.links.length > 0 && (
                    <div className="mt-4 flex flex-row gap-2 w-full items-start not-prose">
                      {serviceSection.links.map((link, index) => {
                        const isExternal = link.target.startsWith('http://') || link.target.startsWith('https://');
                        return (
                          <Button
                            key={index}
                            variant="primary_filled"
                            size="xl"
                          >
                            <Link 
                              href={link.target} 
                              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {link.text}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
              </div>
              
            </section>
          );
        })}
      </div>
    </div>
  )
}
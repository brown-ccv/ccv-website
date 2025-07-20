import React from "react"
import { Hero } from "@/components/Hero"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { readContentFolder } from "@/lib/content-utils"
import { cardVariants } from "@/components/ui/variants";
import { cn } from "@/lib/utils";
import { RatesSectionData, RatesCard, ContentLinks, RatesCategory } from "@/lib/rates-types";
import ExternalLink from "@/components/ui/external-link"

export default async function Rates() {

  const sectionData = await readContentFolder<RatesSectionData>('app/content/services/rates')
  const sectionsMap = new Map(sectionData.map(section => [section.slug, section]));

  // retrieve section data using their slugs - can be ordered here
  const oscar = sectionsMap.get('oscar')!;
  const purchasingCondo = sectionsMap.get('purchasing-a-condo')!;
  const pooledStorageAllocations = sectionsMap.get('pooled-storage-allocations')!;
  const researchDataStorage = sectionsMap.get('research-data-storage')!;

  return (  
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero 
            image={"/images/hero/hero.jpeg"}
            title="Rates"
            description="We provide services with limited resources at no cost to all members affiliated with Brown. For advanced computing that requires extra resources, we charge a monthly fee."
            titleClassName="font-bold text-6xl md:text-8xl"
          />
        </div>
      </div>

      {/* Oscar */}
      <section className="content-wrapper py-24">
        <SectionHeader title={oscar.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              {oscar.data.description}
            </p>
          </CardContent>
        </Card>

        <section className="content-wrapper flex justify-center">
          <div className="flex flex-wrap justify-center gap-6">
            {oscar.data.sections?.map((section: RatesCard) => (
              <div
                key={section.name}
                className="flex-grow max-w-md"
              >
                <div className="inline-flex items-center p-6 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full h-full p-4", cardVariants({ variant: "default" }))}>
                    <CardContent className="flex flex-col h-full">
                      <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                        <CardHeader className="text-center">{section.title}</CardHeader>
                      </div>
                      <CardDescription className="text-lg text-left flex-grow pt-6">
                        <Markdown 
                          rehypePlugins={[rehypeRaw]} 
                          remarkPlugins={[remarkGfm]}
                        >
                          {section.content}
                        </Markdown>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Notes section */}
        {oscar.data.notes && (
          <div className="prose prose-sm mt-12 text-lg">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {oscar.data.notes}
            </Markdown>
          </div>
        )}
        
        {/* Buttons */}
        {oscar.data.links && oscar.data.links.filter(link => link.category === "Default").length > 0 && (
          <div className="flex gap-4 mt-6 justify-center">
            {oscar.data.links.filter(link => link.category === "Default").map((link: ContentLinks) => (
              <Button key={link.text} variant="primary_filled" size="md" className="lg:text-xl lg:h-10 lg:px-6">
                <ExternalLink href={link.target}>
                  {link.text}
                </ExternalLink>
              </Button>
            ))}
          </div>
        )}
      </section>

      {/* Purchasing a Condo */}
      <section className="content-wrapper py-24 bg-neutral-50">
        <SectionHeader title={purchasingCondo.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex flex-col px-6">
            <div className="prose text-xl">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {purchasingCondo.content}
              </Markdown>
            </div>    
          </CardContent>
        </Card>
      </section>

      {/* Research Data Storage */}
      <section className="content-wrapper py-24">
        <SectionHeader title={researchDataStorage.data.title} align="center" />

        {/* Default Category */}
        {researchDataStorage.data.sections!.filter(section => section.category === "default").length > 0 && (
          <>
            <div className="text-left mb-8 px-6">
              <p className="text-xl text-black">
                {researchDataStorage.data.categories?.find((cat: RatesCategory) => cat.name === "default")?.description}
              </p>
            </div>
            <div className="content-wrapper px-0">
                          <div className="flex flex-wrap gap-6">
              {researchDataStorage.data.sections?.filter(section => section.category === "default").map((section: RatesCard) => (
                <div
                  key={section.name}
                  className="w-96"
                >
                    <div className="inline-flex items-center p-6 w-full h-full">
                      <Card className={cn("overflow-hidden flex flex-col w-full h-full p-4", cardVariants({ variant: "default" }))}>
                        <CardContent className="flex flex-col h-full">
                          <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                            <CardHeader className="text-center">{section.title}</CardHeader>
                          </div>
                          <CardDescription className="text-lg text-left flex-grow pt-6">
                            <Markdown 
                              rehypePlugins={[rehypeRaw]} 
                              remarkPlugins={[remarkGfm]}
                            >
                              {section.content}
                            </Markdown>
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Additional Category */}
        {researchDataStorage.data.sections!.filter(section => section.category === "additional").length > 0 && (
          <>
            <div className="text-left mb-8 mt-16 px-6">
              <div className="prose text-xl text-black">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {researchDataStorage.data.categories?.find((cat: RatesCategory) => cat.name === "additional")?.description}
                </Markdown>
              </div>
            </div>
            <div className="content-wrapper px-0">
                          <div className="flex flex-wrap gap-6">
              {researchDataStorage.data.sections?.filter(section => section.category === "additional").map((section: RatesCard) => (
                <div
                  key={section.name}
                  className="w-96"
                >
                    <div className="inline-flex items-center p-6 w-full h-full">
                      <Card className={cn("overflow-hidden flex flex-col w-full h-full p-4", cardVariants({ variant: "default" }))}>
                        <CardContent className="flex flex-col h-full">
                          <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                            <CardHeader className="text-center">{section.title}</CardHeader>
                          </div>
                          <CardDescription className="text-lg text-left flex-grow pt-6">
                            <Markdown 
                              rehypePlugins={[rehypeRaw]} 
                              remarkPlugins={[remarkGfm]}
                            >
                              {section.content}
                            </Markdown>
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Buttons */}
        {researchDataStorage.data.links && researchDataStorage.data.links.filter(link => link.category === "Default").length > 0 && (
          <div className="flex gap-4 mt-6 justify-center">
            {researchDataStorage.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
              <Button key={`research-${index}`} variant="primary_filled" size="md" className="lg:text-xl lg:h-10 lg:px-6">
                <ExternalLink href={link.target}>
                  {link.text}
                </ExternalLink>
              </Button>
            ))}
          </div>
        )}
      </section>

      {/* Pooled Storage Allocations */}
      <section className="content-wrapper py-24 bg-neutral-50">
        <SectionHeader title={pooledStorageAllocations.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex flex-col px-6">
            <div className="prose text-xl">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {pooledStorageAllocations.content}
              </Markdown>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
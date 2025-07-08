import React from "react"
import { Hero } from "@/components/Hero"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { readContentFolder, MarkdownFrontmatter, YamlContentData } from "@/lib/content-utils"
import { cardVariants } from "@/components/ui/variants";
import { cn } from "@/lib/utils";
import { RatesSectionData, RatesCard, ContentLinks } from "@/lib/rates-types";


export default async function Rates() {

  const sectionData = await readContentFolder<RatesSectionData>('content/services/rates')
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
            description="Text tbd."
            titleClassName="font-bold text-6xl md:text-8xl"
          />
        </div>
      </div>

      {/* Oscar */}
      <section className="content-wrapper py-24 px-6 lg:px-36">
        <SectionHeader title={oscar.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              {oscar.data.description}
            </p>
          </CardContent>
        </Card>

        <section className="content-wrapper flex justify-center px-40">
          <div className="flex flex-wrap justify-center">
            {oscar.data.sections?.map((section: RatesCard, index: number) => (
              <div
                key={section.name || index}
                className="flex-grow max-w-md"
              >
                <div className="inline-flex items-center p-6 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full h-full p-4", cardVariants({ variant: "default" }))}>
                    <CardContent className="flex flex-col h-full">
                      <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                        <CardHeader className="text-center">{section.title}</CardHeader>
                      </div>
                      <CardDescription className="text-lg text-left flex-grow">
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
            {oscar.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
              <Button key={`default-${index}`} variant="primary_filled" size="lg">
                <a href={link.target} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </Button>
            ))}
          </div>
        )}
      </section>

      {/* Purchasing a Condo */}
      <section className="content-wrapper py-24 px-14 lg:px-36 bg-neutral-50">
        <SectionHeader title={purchasingCondo.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex flex-col px-6">
            <div className="prose text-xl">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {purchasingCondo.data.content}
              </Markdown>
            </div>
            
            {/* Buttons */}
            {purchasingCondo.data.links && purchasingCondo.data.links.filter(link => link.category === "Default").length > 0 && (
              <div className="flex gap-4 mt-6 not-prose">
                {purchasingCondo.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
                  <Button key={`purchasing-${index}`} variant="primary_filled" size="lg">
                    <a href={link.target} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Pooled Storage Allocations */}
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <SectionHeader title={pooledStorageAllocations.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex flex-col px-6">
            <div className="prose text-xl">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {pooledStorageAllocations.data.content}
              </Markdown>
            </div>
            
            {/* Buttons */}
            {pooledStorageAllocations.data.links && pooledStorageAllocations.data.links.filter(link => link.category === "Default").length > 0 && (
              <div className="flex gap-4 mt-6 not-prose">
                {pooledStorageAllocations.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
                  <Button key={`pooled-${index}`} variant="primary_filled" size="lg">
                    <a href={link.target} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Research Data Storage */}
      <section className="content-wrapper py-24 px-6 lg:px-36 bg-neutral-50">
        <SectionHeader title={researchDataStorage.data.title} align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              {researchDataStorage.data.description}
            </p>
          </CardContent>
        </Card>

        <div className="content-wrapper flex justify-center px-40">
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 xs:w-1/2">
            {researchDataStorage.data.sections?.map((section: RatesCard, index: number) => (
              <div
                key={section.name || index}
                className="w-80"
              >
                <div className="inline-flex items-center gap-2 w-full h-full">
                  <Card className="overflow-hidden flex flex-col w-full h-full bg-white">
                    <CardContent className="flex flex-col h-full px-6 mx-2">
                      <div className="relative border-b border-neutral-300">
                        <h3 className="text-xl font-semibold py-4">{section.title}</h3>
                      </div>
                      <div className="text-lg px-6 flex-grow pt-4 whitespace-pre-line min-h-[200px]">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notes section */}
        {researchDataStorage.data.notes && (
          <div className="prose prose-sm mt-12">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {researchDataStorage.data.notes}
            </Markdown>
          </div>
        )}
        
        {/* Buttons */}
        {researchDataStorage.data.links && researchDataStorage.data.links.filter(link => link.category === "Default").length > 0 && (
          <div className="flex gap-4 mt-6 justify-center">
            {researchDataStorage.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
              <Button key={`research-${index}`} variant="primary_filled" size="lg">
                <a href={link.target} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </Button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
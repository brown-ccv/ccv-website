import React from "react"
import { Hero } from "@/components/Hero"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { readContentFile } from "@/lib/content-utils"
import { OscarData } from "@/lib/oscar-types";
import ExternalLink from "@/components/ui/external-link";

export default async function Oscar() {

  const pageContentData = await readContentFile<OscarData>('content/services/oscar/oscar.yaml')
  
  return (
    <div>
      <Hero 
        title={pageContentData.data.title}
        description={pageContentData.data.description}
      />

      <section className="content-wrapper py-24 px-14 lg:px-36">
        <SectionHeader title={pageContentData.data.sectionTitle} align="center" />
        
        {/* Subsections and buttons */}
        <div className="space-y-12 mb-12">
          {pageContentData.data.subsections.map((subsection, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && (
                <h3 className="text-2xl font-semibold text-gray-900">{subsection.title}</h3>
              )}
              <div className="prose text-xl">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {subsection.description}
                </Markdown>
              </div>
              
              {/* Buttons */}
              {subsection.links && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {subsection.links.map((link) => (
                    <Button variant="primary_filled" size="lg" key={link.text}>
                      <ExternalLink href={link.href} external={true}>
                        {link.text}
                      </ExternalLink>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
import React from "react"
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Hero } from "@/components/Hero"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FeaturedCarousel, FeaturedCarouselItem } from "@/components/FeaturedCarousel";
import { readContentFolder, ContentLinks, MarkdownFrontmatter, YamlContentData, readContentFile } from "@/lib/content-utils"


interface ClassroomSectionData extends MarkdownFrontmatter {
  slug: string;
  content: string;
  links?: ContentLinks[];
}

interface YamlClassroomSectionData extends YamlContentData {
  slug: string;
}

export default async function ClassroomSupport() {

  const sectionData = await readContentFolder<ClassroomSectionData>('content/services/classroom')
  const sectionsMap = new Map(sectionData.map(section => [section.slug, section]));

  // retrieve section data using their slugs - can be ordered here
  const inClassTutorials = sectionsMap.get('in-class-tutorials')!;
  const studentAccounts = sectionsMap.get('student-accounts')!;
  const computationalNotebooks = sectionsMap.get('computational-notebooks')!;

  // Check if computational notebooks is YAML-based
  const isComputationalNotebooksYaml = computationalNotebooks.data.sections !== undefined;

  // Load featured carousel data from YAML
  const featuredCarouselRaw = await readContentFile<{ carousel: FeaturedCarouselItem[] }>('content/services/classroom/featured-carousel.yaml');
  const featuredCarouselData = featuredCarouselRaw.data.carousel;

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero 
            image={"/images/hero/hero.jpeg"}
            title="Classroom Support"
            description="CCV services to help faculty in the classroom. We can provide tutorial or give you access to cutting edge technology for teaching with code"
            titleClassName="font-bold text-6xl md:text-8xl"
          />
        </div>
      </div>

    {/* In Class Tutorials */}
    <section className="content-wrapper pt-24 px-14 lg:px-36">
      <SectionHeader title={inClassTutorials.data.title} align="center" />
      <Card className="w-full border-none shadow-none rounded-none">
        <CardContent className="mx-auto flex flex-col px-6">
          <div className="prose text-xl">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {inClassTutorials.content}
            </Markdown>
          </div>
          
          {/* Buttons */}
          {inClassTutorials.data.links && inClassTutorials.data.links.filter(link => link.category === "Default").length > 0 && (
            <div className="flex gap-4 mt-6 not-prose">
              {inClassTutorials.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
                <Button key={`default-${index}`} variant="primary_filled" size="lg">
                  <a href={link.target} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <FeaturedCarousel carouselData={featuredCarouselData} />
    </section>

    {/* Student Accounts */}
    <section className="content-wrapper py-24 px-14 lg:px-36 bg-neutral-50">
      <SectionHeader title={studentAccounts.data.title} align="center" />
      <Card className="w-full border-none shadow-none rounded-none">
        <CardContent className="mx-auto flex flex-col px-6">
          <div className="prose text-xl">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {studentAccounts.content}
            </Markdown>
          </div>
          
          {/* Buttons */}
          {studentAccounts.data.links && studentAccounts.data.links.filter(link => link.category === "Default").length > 0 && (
            <div className="flex gap-4 mt-6 not-prose">
              {studentAccounts.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
                <Button key={`default-${index}`} variant="primary_filled" size="lg">
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

    {/* Computational Notebooks */}
    <section className="content-wrapper py-24 px-14 lg:px-36">
      <SectionHeader title={computationalNotebooks.data.title} align="center" />
      <Card className="w-full border-none shadow-none rounded-none">
        <CardContent className="mx-auto flex flex-col px-6">
          <div className="prose text-xl">
            {isComputationalNotebooksYaml ? (
              <>
                {/* Description */}
                {(computationalNotebooks.data as YamlContentData).description && (
                  <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {(computationalNotebooks.data as YamlContentData).description!}
                  </Markdown>
                )}
                
                {/* Sections */}
                {(computationalNotebooks.data as YamlContentData).sections?.map((section) => (
                  <div key={section.name}>
                    {/* Section content */}
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {section.title ? `## ${section.title}\n\n${section.content}` : section.content}
                    </Markdown>
                    
                    {/* Section buttons */}
                    {section.links && section.links.length > 0 && (
                      <div className="flex gap-4 mt-6 not-prose">
                        {section.links.map((link: ContentLinks, linkIndex: number) => (
                          <Button 
                            key={`${section.name}-${linkIndex}`} 
                            variant={section.name === 'google-colab' ? 'primary_filled' : 'secondary_filled'} 
                            size="lg"
                          >
                            <a href={link.target} target="_blank" rel="noopener noreferrer">
                              {link.text}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              // Fallback to old markdown approach for backward compatibility
              <>
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {computationalNotebooks.content}
                </Markdown>
                
                {/* Default buttons */}
                {computationalNotebooks.data.links && computationalNotebooks.data.links.filter(link => link.category === "Default").length > 0 && (
                  <div className="flex gap-4 mt-6 not-prose">
                    {computationalNotebooks.data.links.filter(link => link.category === "Default").map((link: ContentLinks, index: number) => (
                      <Button key={`default-${index}`} variant="primary_filled" size="lg">
                        <a href={link.target} target="_blank" rel="noopener noreferrer">
                          {link.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
    </div>
  )
}
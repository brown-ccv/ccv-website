import React from "react";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";
import { readContentFile } from "@/lib/content-utils"
import Icon from "@/components/ui/render-icon";
import { ContactUsTypes, OfficeHoursTypes, PageContentData } from "@/lib/about-types";
import ExternalLink from "@/components/ui/external-link";

const loadedContent = await readContentFile<PageContentData>('content/about/contact.yaml');
const pageContent: PageContentData = loadedContent.data;

export default async function ContactUs() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero 
            image={"/images/hero/about-kayaks.png"}
            title="Contact Us"
            description="The Center for Computation and Visualization is available to help you in multiple ways. We strive to keep our documentation up to date so you can always find what you need. In addition, you can reach out to us using the channels listed here."
            titleClassName="font-bold text-6xl md:text-8xl"
            descriptionClassName="text-4xl font-semibold leading-[1.5]"
          />
        </div>
      </div>

      {/* Contact Us */}
      <section className="content-wrapper py-24 px-6 lg:px-36">
        <SectionHeader title="Contact Us" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl pb-8">
              The Center for Computation and Visualization (CCV) is a center within the University&apos;s central IT organization, which is the Office of Information Technology (OIT). In addition to building and maintaining the University&apos;s hundreds of enterprise software, systems, and hardware, OIT is also responsible for driving the technological progress that enables scientific research. Executing on the University&apos;s research mission is the key role that CCV plays in OIT.
            </p>
          </CardContent>
        </Card>

        <div className="content-wrapper flex justify-center px-40">
          <div className="flex flex-wrap justify-center gap-y-6 gap-x-6 xs:w-1/2">
            {pageContent?.contactUs?.map((card: ContactUsTypes) => (
              <div
                key={card.title}
                className="flex-grow max-w-lg"
              >
                <div className="inline-flex items-center gap-2 w-full h-full">
                  <Card className={cn("overflow-hidden flex flex-col w-full", cardVariants({ variant: "default" }), "h-full")}>
                    <CardContent className="flex flex-col h-full px-6 mx-2">
                      <div className="relative border-b border-neutral-300">
                        <CardHeader className="flex flex-row gap-4 items-center">
                          <Icon iconName={card.icon}></Icon>
                          {card.title}
                        </CardHeader>
                      </div>
                      <CardDescription className="text-lg px-6 flex-grow pt-4">{card.description}</CardDescription>
                      <div className="px-6 flex flex-col gap-2">
                        {card.buttonLinks && card.buttonLinks.map((link, index) => (
                          <Button
                            key={index}
                            variant="primary_filled"
                            size="xl"
                          >
                            <ExternalLink href={link.href} external={true}>{link.text}</ExternalLink>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="content-wrapper py-24 px-6 lg:px-36 bg-gray-100">
        <SectionHeader title="Office Hours" align="center" />
        <Card className="w-full border-none shadow-none rounded-none">
          <CardContent className="mx-auto flex items-center px-6">
            <p className="text-black text-xl">
              The Center for Computation and Visualization (CCV) staff members will be available to answer questions about Brown&apos;s research computing resources (Oscar, Stronghold, Globus) and help high-performance computing (HPC) issues.
              <br/><br/>
              The Computational Biology Core (CBC) staff are available at office hours to provide help with experimental design, data processing pipelines, and data analysis of high-throughput sequencing data. While we specialize in computational biology, all are welcome to join us with their questions.
            </p>
          </CardContent>
        </Card>
        <div>
          <section className="content-wrapper">
            <div className="flex flex-wrap justify-center gap-y-6 gap-x-6">
              {pageContent?.officeHours?.map((card: OfficeHoursTypes) => (
                <div
                  key={card.title}
                  className="flex-grow max-w-md"
                >
                  <div className="inline-flex items-center gap-2 py-8 w-full h-full">
                    <Card className={cn("overflow-hidden flex flex-col w-full h-full", cardVariants({ variant: "default" }))}>
                      <CardContent className="flex flex-col h-full">
                        <div className="relative border-b border-neutral-900 px-4 flex justify-center">
                          <CardHeader className="text-center">{card.title}</CardHeader>
                        </div>
                        <CardDescription className="pt-6 text-xl text-center">{card.subtitle}</CardDescription>
                        <CardTitle className="text-lg text-center flex-grow">
                          <Markdown 
                            rehypePlugins={[rehypeRaw]} 
                            remarkPlugins={[remarkGfm]}
                          >
                            {card.description}
                          </Markdown>
                        </CardTitle>
                        <div className="flex justify-center mt-auto">
                          {card.buttonLinks && card.buttonLinks.map((link, index) => (
                            <Button key={index} variant="primary_filled" size="xl">
                              <ExternalLink href={link.href} external={true}>{link.text}</ExternalLink>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* 180 George St */}
      <div className="content-wrapper px-0 py-14">
        <Card className="w-full shadow-none rounded-none border-none relative flex flex-col">
          <CardContent className="mx-auto flex items-center">
            <div className="w-full xl:w-full px-6 xl:px-36 xl:py-16">
              <SectionHeader title="180 George St" align="center" />
              <p className="text-black text-xl">
                Our office is on Brown&apos;s main campus in Providence&apos;s College Hill neighborhood.
                <br/><br/>
                Built in 1960 and dedicated to Thomas J. Watson in 1961, the building was designed by architect Philip Johnson to house the IBM 7070 computer.
                <br/><br/>
                Today, it hosts the Center for Computation and Visualization, supporting research at Brown.
              </p>
            </div>
            <div className="w-full xl:w-1/2 relative hidden xl:block min-w-[800px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.109984207845!2d-71.40139708797392!3d41.82592977112757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e4453b3f867125%3A0xe3d14e16820236d9!2s180%20George%20Street%2C%20180%20George%20St%2C%20Providence%2C%20RI%2002906!5e0!3m2!1sen!2sus!4v1747770863560!5m2!1sen!2sus"
                width="100%"
                height="700"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import React from "react"
import Link from "next/link"
import { Hero } from "@/components/Hero"
import { TextAnimate } from "@/components/magicui/text-animate"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { readContentFolder } from "@/lib/content-utils"

interface FileContentItem {
  slug: string;
  data: {
    title: string;
    links?: { text: string; href: string }[];
  };
  content: string;
}

const folderContent: FileContentItem[] = await readContentFolder('services/storage') as FileContentItem[];

export default async function Storage() {
    return (
      <div className="w-full">
        <div className="relative w-full flex flex-col">
          <div className="bg-purple-900">
            <Hero image={"/images/hero-subroutes.jpeg"}>
              <div className="relative flex-1 flex items-start w-full px-6 md:px-24 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
                <div className="absolute top-[12%] flex flex-col text-white space-y-6">
                  <TextAnimate className="font-bold text-6xl md:text-8xl">
                    Storage and Transfer
                  </TextAnimate>
                  <p className="text-4xl font-semibold">
                    Several services at Brown allow you to share and store files. This guide will let you compare the options and decide which are right for you.
                  </p>
                </div>
              </div>
            </Hero>
          </div>
        </div>

        <div className="content-wrapper py-16 sm:py-24">
          {folderContent.map((fileContentItem: FileContentItem) => (
            <section key={fileContentItem.slug} className="mb-12">
              <SectionHeader title={fileContentItem.data.title} align="center" />
              <Card className="w-full border-none shadow-none rounded-none">
                <CardContent className="mx-auto flex flex-col items-center px-6">
                  {fileContentItem.content}
                  {fileContentItem.data.links && fileContentItem.data.links.length > 0 && (
                    <div className="mt-4 px-6 flex flex-row gap-2">
                      {fileContentItem.data.links.map((link, index) => (
                        <Button
                          key={index}
                          variant="primary_filled"
                          size="xl"
                        >
                          <Link href={link.href} target="_blank" rel="noopener noreferrer">{link.text}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>
      </div>
    )
}
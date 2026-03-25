import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/routes/about/us.mdx"
import { getMDXMetadata, getMdxSectionItems } from "@/lib/mdx-utils"
import { AppSidebar } from "@/components/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function AboutUs() {
  const mdxPath = "content/routes/about/us.mdx"
  const metadata = getMDXMetadata(mdxPath)
  const sectionItems = getMdxSectionItems(mdxPath)

  return (
    <>
      <Hero
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <SidebarProvider>
        <AppSidebar items={sectionItems} />
        <SidebarInset>
          <SidebarTrigger />
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row md:px-6">
            <div className="min-w-0 flex-1">
              <AboutUsContent />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

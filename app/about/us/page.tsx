import React from "react"
import { Hero } from "@/components/Hero"
import AboutUsContent from "@/content/about/about-us.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default async function AboutUs() {
  const metadata = getMDXMetadata('content/about/about-us.mdx');

  return (
    <div>
      <Hero 
        image={"/images/hero/about-kayaks.png"}
        title={metadata.title}
        description={metadata.description}
      />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <AboutUsContent />
        </div>
      </section>
    </div>
  )
}
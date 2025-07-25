import React from "react";
import ContactContent from "@/content/about/contact.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";
import { Hero } from "@/components/Hero";
import { LocationSection } from "@/components/LocationSection";

export default async function ContactUs() {
  const metadata = getMDXMetadata('content/about/contact.mdx');

  return (
    <div>
      <Hero 
        image={metadata.image}
        title={metadata.title}
        description={metadata.description}
      />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <ContactContent />
        </div>
      </section>
      <LocationSection />
    </div>
  );
}
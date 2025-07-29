import { Hero } from "@/components/Hero";
import { ContentSection } from "@/components/ui/content-section";
import OscarContent from "@/content/services/oscar.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default async function Oscar() {
  const metadata = getMDXMetadata('content/services/oscar.mdx');
  
  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <ContentSection>
        <div className='prose prose-lg text-xl max-w-none'>
          <OscarContent />
        </div>
      </ContentSection>
    </div>
  );
}
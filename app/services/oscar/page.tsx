import { Hero } from "@/components/Hero";
import OscarContent from "@/content/services/oscar.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default async function ClassroomSupport() {
  const metadata = getMDXMetadata('content/services/oscar.mdx');
  
  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <OscarContent />
        </div>
      </section>
    </div>
  );
}
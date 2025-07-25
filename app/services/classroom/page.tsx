import { Hero } from "@/components/Hero";
import ClassroomContent from "@/content/services/classroom.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default function ClassroomSupport() {
  const metadata = getMDXMetadata('content/services/classroom.mdx');
  
  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <ClassroomContent />
        </div>
      </section>
    </div>
  );
}
import { Hero } from "@/components/Hero";
import PageContent from "@/content/services/virtual-machine-hosting.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default function Page() {
  const metadata = getMDXMetadata('content/services/virtual-machine-hosting.mdx');

  return (
    <div>
      <Hero 
        image={"/images/hero/hero.jpeg"}
        title={metadata.title} 
        description={metadata.description} 
      />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
        <PageContent />
        </div>
      </section>
    </div>
  );
}
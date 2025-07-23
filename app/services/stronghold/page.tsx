import { Hero } from "@/components/Hero";
import StrongholdContent from "@/content/services/stronghold.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default function Stronghold() {
  const metadata = getMDXMetadata('content/services/stronghold.mdx');
  
  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <section className="content-wrapper py-24">
        <div className='prose prose-lg text-xl max-w-none'>
        <StrongholdContent />
        </div>
      </section>
    </div>
  );
}
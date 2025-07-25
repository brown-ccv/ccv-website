import { Hero } from "@/components/Hero";
import RatesContent from "@/content/services/rates.mdx";
import { getMDXMetadata } from "@/lib/mdx-utils";

export default async function RatesSupport() {
  const metadata = getMDXMetadata('content/services/rates.mdx');
  
  return (
    <div>
      <Hero title={metadata.title} description={metadata.description} />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
          <RatesContent />
        </div>
      </section>
    </div>
  );
}
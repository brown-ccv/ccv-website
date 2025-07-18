import { Hero } from "@/components/Hero";
import StrongholdContent, { title, description } from "@/content/services/stronghold.mdx";

export default function Stronghold() {
  return (
    <div>
      <Hero title={title} description={description} />
      <section className="content-wrapper py-24 px-14 lg:px-36">
        <div className='prose prose-lg text-xl max-w-none'>
        <StrongholdContent />
        </div>
      </section>
    </div>
  );
}
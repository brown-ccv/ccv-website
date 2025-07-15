import { title, description } from "@/app/content/services/stronghold/metadata";
import { Hero } from "@/components/Hero";
import StrongholdMDXClient from "./StrongholdMDXClient";

export default function Stronghold() {
  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero
            image={"/images/hero/hero.jpeg"}
            title={title}
            description={description}
            titleClassName="font-bold text-6xl md:text-8xl"
          />
        </div>
      </div>
      <section className="content-wrapper py-24 px-6 lg:px-36">
        <div className="prose">
          <StrongholdMDXClient />
        </div>
      </section>
    </div>
  );
}
import type { MDXComponents } from 'mdx/types';
import { SectionHeader } from "@/components/ui/section-header";
import { Hero } from "@/components/Hero";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";
import { FeaturedCarousel, FeaturedCarouselItem } from "@/components/FeaturedCarousel";
import { readContentFile } from "@/lib/content-utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RateCard, RatesGrid } from "@/components/ui/rates-card";
import { PeopleSection } from "@/components/PeopleSection";

export const MDXButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({ variant: "primary_filled", size: "lg" });
  return (
    <div className="inline-block not-prose">
      <ExternalLink 
        href={href} 
        className={`${buttonClassName} my-4`}
        {...props}
      >
        {children}
      </ExternalLink>
    </div>
  );
};

// Server component that loads carousel data from YAML file
async function MDXCarouselData({ carouselContentPath }: { carouselContentPath: string }) {
    const carouselRaw = await readContentFile<{ carousel: FeaturedCarouselItem[] }>(carouselContentPath);
    const carouselData = carouselRaw.data.carousel;
    return <FeaturedCarousel carouselData={carouselData} />;
}

// Client component wrapper for MDX compatibility
export const MDXCarousel = ({ carouselContentPath }: { carouselContentPath: string }) => {
  return <MDXCarouselData carouselContentPath={carouselContentPath} />;
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="text-xl max-w-none">
        {children}
      </div>
    ),

    // Global MDX components
    MDXButton,
    SectionHeader,
    Hero,
    MDXCarousel,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    RateCard,
    RatesGrid,
    PeopleSection,
    ...components,
  };
} 
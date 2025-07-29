import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { SectionHeader } from "@/components/ui/section-header";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";
import { FeaturedCarousel, FeaturedCarouselItem } from "@/components/FeaturedCarousel";
import { readContentFile } from "@/lib/content-utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RatesCard, RatesGrid } from "@/components/ui/rates-card";
import { PeopleSection } from "@/components/PeopleSection";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/render-icon";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";

export const MDXButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({ variant: "primary_filled", size: "lg", align: "center" });
  return (
    <ExternalLink 
      href={href} 
      className={`${buttonClassName} my-4 no-underline`}
      {...props}
    >
      {children}
    </ExternalLink>
  );
};

export const ContactCard = ({ children, title, icon, align = "center", headerAlign, contentAlign }: any) => {
  const IconComponent = icon ? Icon : null;
  
  return (
    <div className="flex-grow max-w-sm">
      <div className="inline-flex items-center gap-2 py-8 w-full h-full">
        <Card className={cn("overflow-hidden flex flex-col w-full h-full", cardVariants({ variant: "default" }))}>
          <CardContent className="flex flex-col h-full">
            <div className="relative border-b border-neutral-300 flex">
              <CardHeader className="flex gap-3 min-w-0" align={headerAlign || align}>
                <div className="flex items-center gap-2 min-w-0">
                  {IconComponent && <IconComponent iconName={icon} className="text-2xl flex-shrink-0 " />}
                  <span className="leading-none">{title}</span>
                </div>
              </CardHeader>
            </div>
            <CardDescription className="pt-6 text-lg" align={contentAlign || align}>{children}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const ContactGrid = ({ children, align = "center", ...props }: any) => (
  <div className={cn(
    "flex flex-wrap gap-y-6 gap-x-6 mb-16",
    align === "center" ? "justify-center" : "justify-start"
  )} {...props}>
    {children}
  </div>
);

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
    Button,
    ContactCard,
    ContactGrid,
    SectionHeader,
    MDXCarousel,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    RatesCard,
    RatesGrid,
    PeopleSection,
    Icon,
    img: (props) => <Image {...props} width={800} height={600} className="max-w-full h-auto" />,
    ...components,
  };
} 
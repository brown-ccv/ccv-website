import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";
import { Hero } from "@/components/Hero";

// Styled wrapper components for MDX content
export const StyledSection = ({ children, className = "", ...props }: any) => (
  <section className="content-wrapper py-24 px-6 lg:px-36">
    <div className={`prose prose-lg text-xl max-w-none ${className}`} {...props}>
      {children}
    </div>
  </section>
);

export const StyledHeading = ({ children, ...props }: any) => (
  <SectionHeader {...props}>{children}</SectionHeader>
);

export const StyledButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({ variant: "primary_filled", size: "lg" });
  
  return (
    <ExternalLink href={href} className={`${buttonClassName} no-underline m-8 styled-button`} {...props}>
      {children}
    </ExternalLink>
  );
};

export const StyledHero = ({ image, title, description, children, ...props }: any) => (
  <div className="w-full">
    <div className="relative w-full flex flex-col">
      <div className="bg-blue-navbar">
        <Hero 
          image={image}
          title={title}
          description={description}
          titleClassName="font-bold text-6xl md:text-8xl"
          {...props}
        >
          {children}
        </Hero>
      </div>
    </div>
  </div>
);  

// Export the original components as well for flexibility
export { SectionHeader, Button, ExternalLink, Hero }; 
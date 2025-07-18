import type { MDXComponents } from 'mdx/types';
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";

export const ContentSection = ({ children, className = "", ...props }: any) => (
  <section className="content-wrapper pt-24 px-14 lg:px-36">
    <div className={`prose prose-lg text-xl max-w-none ${className}`} {...props}>
      {children}
    </div>
  </section>
);

export const StyledButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({ variant: "primary_filled", size: "lg" });
  
  return (
    <ExternalLink href={href} className={`${buttonClassName} no-underline m-8 styled-button !text-2xl`} {...props}>
      {children}
    </ExternalLink>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Add a wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="prose prose-lg text-xl max-w-none [&_button]:!text-2xl">
        {children}
      </div>
    ),
    // Global MDX components
    ContentSection,
    StyledButton,
    SectionHeader,
    Hero,
    Button,
    ...components,
  };
} 
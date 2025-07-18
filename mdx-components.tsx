import type { MDXComponents } from 'mdx/types';
import { SectionHeader } from "@/components/ui/section-header";
import { Hero } from "@/components/Hero";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";

export const ContentSection = ({ children, className = "", ...props }: any) => (
  <section className="content-wrapper py-24 px-14 lg:px-36">
    <div className={`prose prose-lg text-xl max-w-none ${className}`} {...props}>
      {children}
    </div>
  </section>
);

export const LinkButton = ({ children, href, ...props }: any) => {
  const buttonClassName = buttonVariants({ variant: "primary_filled", size: "lg" });
  
  return (
    <div className="inline-block my-4 not-prose">
      <ExternalLink href={href} className={`${buttonClassName}`} {...props}>
        {children}
      </ExternalLink>
    </div>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Add a wrapper component for all MDX content
    wrapper: ({ children }) => (
      <div className="text-xl max-w-none">
        {children}
      </div>
    ),
    // Global MDX components
    ContentSection,
    LinkButton,
    SectionHeader,
    Hero,
    ...components,
  };
} 
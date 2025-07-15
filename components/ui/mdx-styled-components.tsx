import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/variants";
import { ExternalLink } from "@/components/ui/external-link";

// Styled wrapper components for MDX content
export const StyledSection = ({ children, className = "", ...props }: any) => (
  <div className={`prose prose-lg text-xl max-w-none ${className}`} {...props}>
    {children}
  </div>
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

// Export the original components as well for flexibility
export { SectionHeader, Button, ExternalLink }; 
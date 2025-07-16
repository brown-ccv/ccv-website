"use client";

import StrongholdContent from "@/app/content/services/stronghold.mdx";
import { MDXProvider } from "@mdx-js/react";
import { 
  SectionHeader, 
  Button, 
  ExternalLink,
  StyledHero,
  StyledSection,
  StyledHeading,
  StyledButton 
} from "@/components/ui/mdx-styled-components";

const components = {
  SectionHeader,
  Button,
  ExternalLink,
  StyledHero,
  StyledSection,
  StyledHeading,
  StyledButton,
};

export default function StrongholdMDXClient() {
  return (
    <MDXProvider components={components}>
      <div className="prose prose-lg text-xl max-w-none [&_.styled-button]:!text-2xl">
        <StrongholdContent />
      </div>
    </MDXProvider>
  );
} 
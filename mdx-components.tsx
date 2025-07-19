import type { MDXComponents } from 'mdx/types';
import {
  StyledHero,
  StyledSection,
  StyledHeading,
  StyledButton,
} from "@/components/ui/mdx-styled-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    StyledHero,
    StyledSection,
    StyledHeading,
    StyledButton,
    ...components,
  };
} 
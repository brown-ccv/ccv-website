"use client";

import StrongholdContent from "@/app/content/services/stronghold/stronghold.mdx";
import { MDXProvider } from "@mdx-js/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";

const components = {
  SectionHeader,
  Button,
  ExternalLink,
};

export default function StrongholdMDXClient() {
  return (
    <MDXProvider components={components}>
      <StrongholdContent />
    </MDXProvider>
  );
} 
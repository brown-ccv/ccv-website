import React from "react"
import { Hero } from "@/components/Hero"
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { ExternalLink } from '@/components/ui/external-link';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const components = {
  SectionHeader,
  Button,
  ExternalLink,
};

export default async function Stronghold() {
  const filePath = path.join(process.cwd(), 'content/services/stronghold/stronghold.mdx');
  const file = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(file);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content);

  return (
    <div className="w-full">
      <div className="relative w-full flex flex-col">
        <div className="bg-blue-navbar">
          <Hero 
            image={"/images/hero/hero.jpeg"}
            title="Stronghold"
            description="Stronghold is a secure computing and storage environment that enables Brown researchers to analyze sensitive data while complying with regulatory or contractual requirements"
            titleClassName="font-bold text-6xl md:text-8xl"
          />
        </div>
      </div>
      <div className="prose">
        <MDXRemote {...mdxSource} components={components} />
      </div>    
    </div>
  )
}
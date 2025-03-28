// app/ClientLayout.tsx
"use client"

import React, { useRef } from "react";
import { Hero } from "@/components/Hero";
import { MissionCards } from "@/components/MissionCards";
import { FeaturedProjects } from "@/components/FeaturedProjects";

export default function ClientLayout() {
  const featuredProjectsRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedProjects = () => {
    featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative">
        <Hero onViewEventsClick={scrollToFeaturedProjects} />
        <MissionCards />
      </div>
      <div ref={featuredProjectsRef} className="mt-20">
        <FeaturedProjects />
      </div>
    </>
  )
}
// app/ClientLayout.tsx
"use client"

import React, { useRef } from "react"
import { Hero } from "@/components/Hero"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import { FeaturedProjects } from "@/components/FeaturedProjects"

export default function ClientLayout() {
  const featuredProjectsRef = useRef<HTMLDivElement>(null)

  const scrollToFeaturedProjects = () => {
    featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="relative w-full">
        <Hero onViewEventsClick={scrollToFeaturedProjects} />
        <HeroCard />
        <ImpactBanner />
      </div>
      <div ref={featuredProjectsRef} className="mt-20 w-full">
        <FeaturedProjects />
      </div>
    </>
  )
}
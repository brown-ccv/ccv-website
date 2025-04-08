// app/ClientLayout.tsx
"use client"

import React, { useRef } from "react"
import { Hero } from "@/components/Hero"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import { FeaturedCarousel } from "@/components/FeaturedCarousel"

export default function ClientLayout() {
  const featuredCarouselRef = useRef<HTMLDivElement>(null)

  const scrollToFeaturedCarousel = () => {
    featuredCarouselRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="relative w-full">
          <div className="flex flex-col space-y-24"> 
            <Hero onViewEventsClick={scrollToFeaturedCarousel} />
            <HeroCard />
            <ImpactBanner />
          </div>
        </div>
      <div ref={featuredCarouselRef} className="mt-20 w-full">
        <FeaturedCarousel />
      </div>
    </>
  )
}
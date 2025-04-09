// app/ClientLayout.tsx
"use client"

import React, { useRef } from "react"
import { Hero } from "@/components/Hero"
import { HeroCard } from "@/components/HeroCard"
import { ImpactBanner } from "@/components/ImpactBanner"
import SectionHeader from "@/components/SectionHeader"
import { FeaturedCarousel } from "@/components/FeaturedCarousel"

export default function ClientLayout() {
  const eventsRef = useRef<HTMLDivElement>(null)

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="relative w-full">
          <div className="flex flex-col space-y-24"> 
            <Hero onViewEventsClick={scrollToEvents} />
            <HeroCard />
            <ImpactBanner />
          </div>
        </div>
      <div ref={eventsRef} className="mt-20 w-full">
        <SectionHeader  href={"#events"} title={"Events"} />
      </div>
    </>
  )
}
"use client"

import { scrollToID } from "@/lib/utils"
import { Hero } from "@/components/Hero"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"

export const HeroHome = () => {
  return (
    <div className="bg-blue-navbar">
      <Hero image={"static/images/hero-landing.jpeg"}>
        {/* Hero content */}
        <div className="relative flex-1 flex items-start content-wrapper overflow-hidden">
          {/* Removed w-full here to prevent spillover */}
          <div className="absolute top-[12%] flex flex-col max-w-full text-white space-y-6">
          <TypingAnimation className="font-bold text-4xl md:text-5xl lg:text-6xl">
              Center for Computation and Visualization
            </TypingAnimation>

            <p className="text-lg md:text-xl font-normal">
              Advancing computational research with scientific and computing
              expertise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-0 md:pt-20">
              <Button
                variant="secondary_filled"
                className="h-[55px] font-semibold"
              >
                Work with Us
              </Button>

              <Button
                variant="secondary_outlined"
                className="h-[55px] font-semibold"
                onClick={() => scrollToID("events")}
              >
                View Events
              </Button>
            </div>
          </div>
        </div>
      </Hero>
    </div>
  )
}

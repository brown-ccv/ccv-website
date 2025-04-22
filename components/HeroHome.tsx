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
        <div className="relative flex-1 flex items-start w-full px-24 overflow-hidden">
          {/* Removed w-full here to prevent spillover */}
          <div className="absolute top-[12%] flex flex-col max-w-full text-white space-y-6">
          <TypingAnimation className="font-bold text-7xl">
              Center for Computation and Visualization
            </TypingAnimation>

            <p className="text-2xl font-normal">
              Advancing computational research with scientific and computing
              expertise.
            </p>

            <div className="flex flex-row flex-wrap gap-4 pt-8 md:pt-20">
              <Button
                variant="secondary_filled"
                className="h-[55px] min-w-[155px] self-start"
              >
                Work with Us
              </Button>

              <Button
                variant="secondary_outlined"
                className="h-[55px] min-w-[155px] self-start"
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

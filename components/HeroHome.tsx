"use client"

import { scrollToID } from "@/lib/utils"
import { Hero } from "@/components/Hero"
import NavbarAnima from "@/components/header/NavbarAnima"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { Button } from "@/components/ui/button"

export const HeroHome = () => {
  return (
    <Hero image={`url(/static/images/hero-landing.jpeg)`}>
      {/* Sticky top navbar */}
      <NavbarAnima />
      {/* Hero content */}
      <div className="flex-1 flex items-center px-[8vw]">
        <div className="flex flex-col w-full text-white space-y-8">
          <TypingAnimation className="font-bold text-4xl md:text-5xl lg:text-6xl max-w-full">
            Advancing Computational Research
          </TypingAnimation>

          <p className="text-lg md:text-xl font-normal max-w-full">
            At CCV, we support a wide range of research at Brown with our
            scientific and computing expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary_filled"
              className="h-[55px] w-full sm:w-[155px]  font-semibold text-lg"
            >
              Work with Us
            </Button>

            <Button
              variant="secondary_outlined"
              className="h-[55px] w-full sm:w-[155px]  font-semibold text-lg"
              onClick={() => scrollToID("events")}
            >
              View Events
            </Button>
          </div>
        </div>
      </div>
    </Hero>
  )
}

import React from "react"
import { Button } from "@/components/ui/button"
import NavbarAnima from "@/components/header/NavbarAnima"
import { TypingAnimation } from "@/components/magicui/typing-animation"

interface HeroProps {
  onViewEventsClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onViewEventsClick }) => {
  return (
    <div
      className="w-full h-[1200px] bg-cover bg-center relative flex flex-col overflow-hidden m-0 p-0"
      style={{
        backgroundImage: `url(/static/images/hero-landing.jpeg)`,
        backgroundSize: "cover",
      }}
    >
      {/* Sticky top navbar */}
      <NavbarAnima />

      {/* Hero content */}
      <div className="flex-1 flex items-center px-[8vw]">
        <div className="flex flex-col w-full text-white space-y-8">
          <TypingAnimation className="font-bold text-4xl md:text-5xl lg:text-6xl max-w-full">
            Advancing Computational Research
          </TypingAnimation>

          <p className="text-lg md:text-xl font-normal max-w-full">
            At CCV, we support a wide range of research at Brown with our scientific and computing expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="filled_secondary"
              className="h-[55px] w-full sm:w-[155px] rounded-[50px] font-semibold text-lg"
            >
              Work with Us
            </Button>

            <Button
              variant="outline_secondary"
              className="h-[55px] w-full sm:w-[155px] rounded-[50px] font-semibold text-lg"
              onClick={onViewEventsClick}
            >
              View Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

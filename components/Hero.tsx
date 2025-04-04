import React from "react"
import heroBackground from '/static/images/hero-landing.jpeg'
import { Button } from "@/components/ui/button"
import NavbarAnima from "@/components/header/NavbarAnima"
import { AnimatedTitle } from "@/components/AnimatedTitle"

interface HeroProps {
  onViewEventsClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onViewEventsClick }) => {
  return (
    <section 
      className="w-full h-[810px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <NavbarAnima />
      <div className="absolute w-[708px] top-[190px] left-[161px]">
        <AnimatedTitle text="Advancing Computational Research" />
      </div>

      <p className="absolute w-[765px] top-[286px] left-[161px] font-normal text-white text-2xl">
        At CCV, we support a wide range of research at Brown with our scientific and computing expertise.
      </p>

      <div className="absolute top-[457px] left-[157px] flex space-x-4">
        <Button 
          variant="filled_secondary"
          className="h-[55px] w-[155px] rounded-[50px] font-semibold text-xl" 
        >
          Work with Us
        </Button>

        <Button
          variant="outline_secondary"
          className="h-[55px] w-[155px] rounded-[50px] font-semibold text-xl" 
          onClick={onViewEventsClick}
        >
          View Events
        </Button>
      </div>
    </section>
  )
}

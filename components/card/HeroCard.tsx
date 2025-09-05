import React from "react"
import CCVBars from "@/components/assets/CCVBars"
import { StyledCard } from "@/components/card/StyledCard"

const heroCards = [
  {
    title: "Our Mission",
    description:
      "We provide scientific and technical computing expertise to advance computational research and support Brown's academic mission.",
  },
  {
    title: "Research Support",
    description:
      "We partner with researchers, combining diverse expertise across disciplines to transform complex projects into groundbreaking discoveries.",
  },
  {
    title: "Compute Infrastructure",
    description:
      "We maintain secure, high‑performance computing infrastructure, along with storage solutions and virtual computing environments to support research and innovation.",
  },
]

export const HeroCard: React.FC = () => {
  return (
    <StyledCard variant="sticky" size="custom">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        {heroCards.map((card, index) => (
          <div key={index} className="relative">
            <CCVBars />
            <h2 className="py-2 text-xl font-semibold leading-tight tracking-tight">
              {card.title}
            </h2>
            <p className="text-lg">{card.description}</p>
          </div>
        ))}
      </div>
    </StyledCard>
  )
}

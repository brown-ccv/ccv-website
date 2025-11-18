import React from "react"
import { StyledCard } from "@/components/card/StyledCard"
import { SectionHeader } from "@/components/SectionHeader"

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
    <StyledCard
      className="relative z-10 mx-6 -mt-[170px] mb-16 flex justify-center px-2 sm:p-6 lg:mx-12 lg:p-8"
      size="custom"
    >
      <div className="flex flex-col gap-10 pt-6 lg:flex-row lg:gap-20">
        {heroCards.map((card, index) => (
          <div key={index} className="relative space-y-4">
            <SectionHeader
              titleClassName="text-2xl"
              title={card.title}
              align="left"
            />
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </StyledCard>
  )
}

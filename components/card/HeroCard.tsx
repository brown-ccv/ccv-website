import React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import CCVBars from "@/components/assets/CCVBars"

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
    <Card className="relative z-10 -mt-[170px] mb-[120px] flex justify-center bg-white px-6 lg:mx-12 lg:px-8">
      <CardContent className="flex flex-col gap-10 lg:flex-row lg:gap-20">
        {heroCards.map((card, index) => (
          <div key={index} className="relative">
            <CCVBars />
            <h2 className="py-2">
              {card.title}
            </h2>
            <p className="text-xl">{card.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

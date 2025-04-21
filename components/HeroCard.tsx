import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cardVariants } from "@/components/ui/variants"
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
    <div className="relative z-10 flex justify-center mx-auto mt-0 md:-mt-[170px] mb-[120px]">
      <Card className={cardVariants({ variant: "elevated" })}>
        <CardContent className="p-10">
          <div className="flex justify-center items-start gap-20 flex-wrap">
            {heroCards.map((card, index) => (
              <div key={index} className="max-w-sm">
                <div className="inline-flex items-center gap-2 py-8">
                  <div className="relative">
                    <CCVBars />
                    <h3 className="font-semibold text-black text-2xl tracking-tight leading-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p className="text-black text-xl">{card.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

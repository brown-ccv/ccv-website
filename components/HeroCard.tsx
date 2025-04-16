import React from "react"
import { Card, CardContent } from "@/components/ui/card"
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
      "We maintain secure, high-performance computing infrastructure, along with storage solutions and virtual computing environments to support research and innovation.",
  },
]

export const HeroCard: React.FC = () => {
  return (
    <div
      className="relative z-10 flex justify-center mx-auto"
      style={{ marginTop: "-150px" }}
    >
      <Card className="inline-block bg-white rounded-[5px] shadow-[0px_4px_4px_1px_#0000001a] border-none">
        <CardContent className="p-10">
          <div className="flex justify-center items-start gap-[88px] flex-wrap">
            {heroCards.map((card, index) => (
              <div key={index} className="w-[348px]">
                <div className="inline-flex items-center gap-2 px-[5px] py-[29px]">
                  <div className="relative">
                    <CCVBars className="mb-2" />
                    <h3 className="font-semibold text-black text-2xl tracking-[-0.72px] leading-[31px]">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p className="font-normal text-black text-xl mt-6">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
];

export const HeroCard: React.FC = () => {
  return (
    <div className="relative z-10 mx-auto" style={{ marginTop: '-150px' }}>
      <Card className="w-[1342px] bg-white rounded-[5px] shadow-[0px_4px_4px_1px_#0000001a] border-none">
        <CardContent className="p-10">
          <div className="flex justify-center items-start gap-[88px]">
            {heroCards.map((card, index) => (
              <div key={index} className="w-[348px]">
                <div className="inline-flex items-center gap-2 px-[5px] py-[29px]">
                  <div className="relative">
                    <img
                      className="w-[59px] h-[5px]"
                      alt="CCV bars"
                      src="https://c.animaapp.com/VOhWj8ET/img/ccvbars-4.svg"
                    />
                    <h3 className="mt-[18px] font-semibold text-defaultblack text-2xl tracking-[-0.72px] leading-[31px]">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <p className="font-normal text-defaultblack text-xl mt-6">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React from "react";
import { Card, CardContent } from "@/components/hero/Card";

export const HeroCard = (): JSX.Element => {
  // Data for the three columns
  const missionData = [
    {
      id: 1,
      title: "Our Mission",
      description:
        "We provide scientific and technical computing expertise to advance computational research and support Brown's academic mission.",
    },
    {
      id: 2,
      title: "Research Support",
      description:
        "We partner with researchers, combining diverse expertise across disciplines to transform complex projects into groundbreaking discoveries.",
    },
    {
      id: 3,
      title: "Compute Infrastructure",
      description:
        "We maintain secure, high-performance computing infrastructure, along with storage solutions and virtual computing environments to support research and innovation.",
    },
  ];

  return (
    <Card className="w-full max-w-[1342px] bg-defaultwhite rounded-[5px] shadow-[0px_4px_4px_1px_#0000001a]">
      <CardContent className="p-10">
        <div className="flex flex-wrap justify-between gap-[88px]">
          {missionData.map((item) => (
            <div key={item.id} className="w-full max-w-[348px]">
              <div className="relative mb-6">
                <img
                  className="w-[59px] h-[5px]"
                  alt="Ccv bars"
                  src="https://c.animaapp.com/VIXZSVf6/img/ccvbars-2.svg"
                />
                <h2 className="mt-[18px] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-defaultblack text-2xl tracking-[-0.72px] leading-[31.0px]">
                  {item.title}
                </h2>
              </div>
              <p className="[font-family:'Source_Sans_Pro',Helvetica] font-normal text-defaultblack text-xl leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

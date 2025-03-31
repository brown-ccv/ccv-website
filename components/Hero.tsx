import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedTitle } from "@/components/AnimatedTitle";

interface HeroProps {
  onViewEventsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewEventsClick }) => {
  return (
    <section className="w-full h-[810px] bg-[url(https://c.animaapp.com/VOhWj8ET/img/adobestock-443655134-1.png)] bg-cover bg-center relative">
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
  );
};

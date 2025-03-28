import React from "react";
import { Button } from "@/components/hero/Button";
import { Navbar } from "@/components/header/Navbar";

export const Hero = (): JSX.Element => {
  return (
    <section className="relative w-full h-[810px] bg-[url(https://c.animaapp.com/sEDwpR1A/img/adobestock-443655134-1.png)] bg-cover bg-center">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-[708px] h-[62px] mb-8 bg-[url(https://c.animaapp.com/sEDwpR1A/img/mask-group.png)] bg-cover relative">
          <img
            className="absolute w-px h-[62px] top-0 left-[29px] object-cover"
            alt="Line"
            src="https://c.animaapp.com/sEDwpR1A/img/line-4.svg"
          />
        </div>

        <p className="max-w-[765px] font-['Lato',Helvetica] font-normal text-white text-2xl mb-12">
          At CCV, we support a wide range of research at Brown with our
          scientific and computing expertise.
        </p>

        <div className="flex gap-4">
          <Button variant="default" className="h-[55px] px-5 rounded-[50px] text-defaultblack">
            <span className="font-['Source_Sans_Pro',Helvetica] font-semibold text-xl">
              Work with Us
            </span>
          </Button>

          <Button
            variant="outline"
            className="h-[55px] px-5 rounded-[50px]"
          >
            <span className="font-['Source_Sans_Pro',Helvetica] font-semibold text-xl">
              View Events
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

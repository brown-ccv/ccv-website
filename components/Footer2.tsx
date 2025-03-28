import React from "react";
import { ArrowRightIcon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { text: "VISIT BROWN", href: "#" },
  { text: "CAMPUS MAP", href: "#" },
  { text: "RESERVATIONS", href: "#" },
  { text: "ACCESSIBILITY", href: "#" },
  { text: "CAREERS AT BROWN", href: "#" },
  { text: "GIVE TO BROWN", href: "#" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full h-[403px] bg-defaultblack">
      <div className="pt-[51px] px-[102px] h-[317px] flex">
        <div className="w-1/2">
          <p className="text-extendedcream text-base">BROWN UNIVERSITY</p>

          <div className="flex items-center mt-12">
            <MapPinIcon className="w-[15px] h-[15px] text-white mr-3" />
            <p className="font-semibold text-defaultwhite text-xl">
              Providence, RI 02912
            </p>
          </div>

          <div className="flex items-center mt-4 ml-[315px]">
            <PhoneCallIcon className="w-[21px] h-[21px] text-white mr-3" />
            <p className="font-semibold text-defaultwhite text-xl">
              401-863-1000
            </p>
          </div>

          <div className="flex flex-wrap mt-10">
            {footerLinks.slice(0, 3).map((link, index) => (
              <div key={index} className="flex items-center mr-8 mb-4">
                <span className="text-extendedsunglow-400 text-[15px]">
                  {link.text}
                </span>
                <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5" />
              </div>
            ))}
          </div>

          <Separator className="my-10 w-[572px]" />

          <div className="flex flex-wrap">
            {footerLinks.slice(3, 5).map((link, index) => (
              <div key={index} className="flex items-center mr-8 mb-4">
                <span className="text-extendedsunglow-400 text-[15px]">
                  {link.text}
                </span>
                <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5" />
              </div>
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="mx-10 h-[245px]" />

        <div className="w-1/3">
          <img
            className="w-[218px] h-[61px] object-cover"
            alt="Brown University Logo"
            src="https://c.animaapp.com/VOhWj8ET/img/logo-together-1@2x.png"
          />

          <p className="font-semibold italic text-extendedcream text-xl mt-10">
            The campaign for building on distinction
          </p>

          <div className="flex items-center mt-16">
            <span className="text-extendedsunglow-400 text-[15px]">
              {footerLinks[5].text}
            </span>
            <ArrowRightIcon className="w-3.5 h-2.5 ml-1.5" />
          </div>
        </div>
      </div>

      <div className="h-[86px] bg-defaultblack flex items-center px-[102px]">
        <p className="text-extendedcream text-base">© Brown University</p>
      </div>
    </footer>
  );
};

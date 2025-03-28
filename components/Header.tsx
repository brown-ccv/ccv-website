import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="w-full h-[149px] bg-defaultwhite relative mt-10">
      <div className="flex items-center">
        <img
          className="w-[187px] h-20 ml-[49px] mt-[35px] mix-blend-multiply object-cover"
          alt="Brown University Logo"
          src="https://c.animaapp.com/VOhWj8ET/img/oit-logo-color-horizontal-233px-1@2x.png"
        />
        <div className="mx-6 mt-[35px]">
          <h1 className="font-semibold text-black text-[26px]">
            Center for Computation and Visualization
          </h1>
        </div>
      </div>

      <Button
        variant="outline"
        className="absolute w-[159px] h-[50px] top-[53px] right-[49px] border-extendedred-uni text-extendedred-uni font-semibold"
      >
        <MessageSquareIcon className="mr-2 h-[26px] w-[26px]" />
        Work with Us
      </Button>
    </header>
  );
};

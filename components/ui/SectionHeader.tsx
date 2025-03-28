import React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-16">
      <div className="relative inline-block">
        <img
          className="w-[59px] h-[5px] mx-auto"
          alt="CCV bars"
          src="https://c.animaapp.com/VOhWj8ET/img/ccvbars-4.svg"
        />
        <h2 className="font-semibold text-defaultblack text-[40px] tracking-[-1.20px] mt-5">
          {title}
        </h2>
      </div>
    </div>
  );
};

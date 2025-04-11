import React from "react";
import CCVBars from "@/components/assets/CCVBars"

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-16">
      <div className="relative inline-block">
        <CCVBars />
        <h2 className="font-semibold text-black text-[40px] tracking-[-1.20px] mt-5">
          {title}
        </h2>
      </div>
    </div>
  );
};

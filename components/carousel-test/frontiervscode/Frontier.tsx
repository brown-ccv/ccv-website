"use client";

import React from "react";
import { BrowserWindow } from "@/components/carousel-test/frontiervscode/BrowserWindow";
import { ChevronButton } from "@/components/carousel-test/frontiervscode/ChevronButton";
import faUser from "@/components/assets/frontier/fa-user.svg";
import screenshot20250110At20529Pm1 from "./screenshot-2025-01-10-at-2-05-29-PM-1.png";

export const PropertyDefault = (): JSX.Element => {
  return (
    <section className="relative w-[1440px] h-[588px] bg-white flex items-center justify-center">
      {/* Public Health Tag */}
      <div className="absolute top-[30px] left-[122px] flex items-center justify-center gap-2.5 px-3 py-1 bg-[#ffc72c] rounded-full">
        <span className="font-semibold text-black text-xs">Public Health</span>
      </div>

      {/* Title */}
      <h1 className="absolute top-[74px] left-[122px] text-black text-[28px] font-semibold">
        PROVIDENT
      </h1>

      {/* Organization Info */}
      <div className="absolute top-[133px] left-[120px] flex items-center gap-2">
        <img className="w-6 h-6" alt="User Icon" src={faUser} />
        <p className="text-black text-lg">
          Brown School of Public Health
          <br />
          RI Department of Health
        </p>
      </div>

      {/* Description */}
      <p className="absolute top-[264px] left-[125px] w-[440px] text-neutral-800 text-xl">
        A web app to support the PROVIDENT research study looking to prevent
        drug-related deaths in neighborhoods across Rhode Island. The dashboard
        showcases a predictive analytics model that identifies neighborhoods
        where future overdose deaths are most likely to occur.
      </p>

      {/* Buttons */}
      <div className="absolute top-[472px] left-[122px] flex gap-6">
        <button className="w-[155px] h-[55px] bg-[#00947d] text-white text-xl font-semibold rounded-full">
          Website
        </button>
        <button className="w-[155px] h-[55px] border-2 border-[#00947d] text-[#00947d] text-xl font-semibold rounded-full">
          View More
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-[29px] left-1/2 transform -translate-x-1/2 flex gap-4">
        <div className="w-4 h-2 bg-[#cacaca] rounded-full"></div>
        <div className="w-2 h-2 bg-[#cacaca] rounded-full"></div>
        <div className="w-2 h-2 bg-[#cacaca] rounded-full"></div>
        <div className="w-2 h-2 bg-[#cacaca] rounded-full"></div>
        <div className="w-2 h-2 bg-[#cacaca] rounded-full"></div>
      </div>

      {/* Navigation Buttons */}
      <ChevronButton
        className="absolute left-12 top-1/2 transform -translate-y-1/2"
        property1="left"
      />
      <ChevronButton
        className="absolute right-12 top-1/2 transform -translate-y-1/2"
        property1="right"
      />

      {/* Browser Window */}
      <div className="absolute top-[57px] left-[617px] w-[721px] h-[443px] rounded-[10px]">
        <BrowserWindow
          className="h-full w-full"
          divClassName="h-[15px] w-[15px] rounded-full left-[71px] top-[9px]"
          ellipseClassName="h-[15px] w-[15px] rounded-full left-[25px] top-[9px]"
          ellipseClassNameOverride="h-[15px] w-[15px] rounded-full left-12 top-[9px]"
          overlapGroupClassName="h-8 bg-[#f8f8f8]"
        />
        {/* <img
          className="absolute w-[567px] h-[389px] top-[39px] left-[66px] object-cover"
          alt="Screenshot"
          src={screenshot20250110At20529Pm1}
        /> */}
      </div>
    </section>
  );
};
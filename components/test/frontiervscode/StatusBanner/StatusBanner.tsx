"use client";

import Button from "@/components/Button";
import React from "react";
import close from "./close.svg";

export const StatusBanner = (): JSX.Element => {
  return (
    <div className="w-full h-10 bg-[#c00404] flex items-center justify-center relative">
      {/* Close button */}
      <img
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
        alt="Close"
        src={close}
      />

      {/* Status message */}
      <div className="flex items-center space-x-2 text-white text-xs font-bold">
        <span>Service Disruption:</span>
        <span className="font-normal">oscar, Hibernate</span>
        <Button variant="yellow">View Incidents</Button>
      </div>
    </div>
  );
};


export default StatusBanner
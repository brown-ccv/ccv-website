"use client"

import { XCircleIcon } from "lucide-react";
import React from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export const StatusBanner = (): JSX.Element => {
  const [isVisible, setIsVisible] = React.useState(true);

//   if (!isVisible) return null;

  return (
    <Alert
      className="w-full h-10 bg-collection-1-red rounded-none border-none relative"
      variant="destructive"
    >
      <AlertDescription className="flex items-center justify-center gap-1 text-white">
        <span className="font-bold">Service Disruption:</span>
        <span>oscar, Hibernate</span>
        <Button
          variant="secondary"
          size="sm"
          className="ml-4 h-6 bg-collection-1-yellow hover:bg-collection-1-yellow/90 text-black rounded-full text-[11px] font-normal"
        >
          View Incidents
        </Button>
      </AlertDescription>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-2.5"
      >
        <XCircleIcon className="h-5 w-5 text-white" />
      </button>
    </Alert>
  );
};

export default StatusBanner;
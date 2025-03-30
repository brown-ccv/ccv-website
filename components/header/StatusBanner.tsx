"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function StatusBanner({ children, isOperational }: { children: React.ReactNode; isOperational?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className={`relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1 
      ${isOperational ? "bg-primary-500 bg-opacity-50" : "bg-red-university"}`}
    >
      {children}
      <div className="flex flex-1 justify-end">
        <Button
          variant="icon"
          iconOnly={<XMarkIcon aria-hidden="true" className="size-5 text-white" />}
          onClick={() => setIsOpen(false)}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}

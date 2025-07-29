import React from "react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";

interface RatesCardProps {
  title: string;
  children: React.ReactNode;
}

export const RatesCard: React.FC<RatesCardProps> = ({ title, children }) => {
  return (
    <div className="flex-grow max-w-sm">
      <div className="inline-flex items-center gap-2 py-8 w-full h-full">
        <Card className={cn("overflow-hidden flex flex-col w-full h-full", cardVariants({ variant: "default" }))}>
          <CardContent className="flex flex-col h-full">
            <div className="relative border-b border-neutral-300 px-4 flex justify-center">
              <CardHeader className="text-center">{title}</CardHeader>
            </div>
            <CardDescription className="pt-6 text-lg text-left">{children}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface RatesGridProps {
  children: React.ReactNode;
  align?: "center" | "left";
}

export const RatesGrid: React.FC<RatesGridProps> = ({ children, align = "center" }) => {
  return (
    <div className={cn(
      "flex flex-wrap gap-y-6 gap-x-6",
      align === "center" ? "justify-center" : "justify-start"
    )}>
      {children}
    </div>
  );
}; 
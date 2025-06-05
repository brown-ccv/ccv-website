// components/ui/card-with-image.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/variants";

interface CardWithImageProps {
  className?: string;
  imagePath: string;
  hoverImagePath?: string;
  name: string;
  title: string;
}

export const CardWithImage: React.FC<CardWithImageProps> = ({ className, imagePath, hoverImagePath, name, title, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn("overflow-hidden", cardVariants({ variant: "people" }), "w-[400px]", "h-[600px]", "flex-shrink-0")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <Image
            src={isHovered && hoverImagePath ? hoverImagePath : imagePath}
            alt={name}
            width="500"
            height="500"
            className="rounded-full transition-opacity duration-300 max-h-[350px] min-h-[350px] max-w-[350px]"
          />
        </div>
        <div>
          <CardTitle className="text-2xl text-center py-4">{name}</CardTitle>
          <CardDescription className="text-xl italic text-center">{title}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
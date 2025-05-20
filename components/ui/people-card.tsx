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
      className={cn(className, "overflow-hidden", cardVariants({ variant: "people" }))}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <div className="relative">
          <Image
            src={isHovered && hoverImagePath ? hoverImagePath : imagePath}
            alt={name}
            width={300}
            height={300}
            style={{ objectFit: 'cover' }}
            className="rounded-full w-full transition-opacity duration-300"
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
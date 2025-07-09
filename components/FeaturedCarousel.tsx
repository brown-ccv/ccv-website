"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { getColorForTag } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Icon from "@/components/ui/render-icon";

export interface FeaturedCarouselItem {
  title: string;
  category: string;
  description: string;
  image: string;
  profile?: {
    name: string;
    organization: string;
    icon?: string;
  };
  buttons?: {
    text: string;
    url: string;
    variant: "primary_filled" | "primary_outlined" | "secondary_filled" | "secondary_outlined";
  }[];
}

interface FeaturedCarouselProps {
  carouselData: FeaturedCarouselItem[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  carouselData,
}) => {
  const [idx, setIdx] = useState(0);
  const currentItem = carouselData[idx];
  const { title, category, description, image, profile, buttons } = currentItem;

  const prev = () =>
    setIdx((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIdx((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  return (
    <section className="mt-12 mb-24 sm:mx-2">
      <div className="w-full max-w-[2040px] px-2">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-8">
          {/* Text Content */}
          <div className="w-full max-w-[700px] space-y-6 pt-4">
            <Badge
              color={getColorForTag(category)}
              className="rounded-full font-semibold text-sm"
            >
              {category}
            </Badge>
            <h3 className="text-3xl font-semibold">{title}</h3>
            {profile && (
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex items-center p-0">
                  <div className="w-6 h-6 mr-3">
                    <Icon iconName={profile.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl leading-snug">{profile.name}</CardTitle>
                    <CardDescription className="text-md">{profile.organization}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            )}
            <p className="text-xl font-normal text-gray-800">{description}</p>
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    className="h-[55px] px-6 font-semibold text-xl self-start whitespace-nowrap"
                    onClick={() => window.open(button.url, "_blank")}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full max-w-[700px] space-y-6 lg:w-full hidden lg:block">
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="object-contain min-w-[700px] xs:hidden"
              style={{ width: '700px', height: '500px' }}
            />
          </div>
        </div>

        {/* Pagination + Chevrons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8">
          {/* Prev button */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="previous project"
            onClick={prev}
            className="w-[40px] h-[40px] text-neutral-300 border-neutral-300 mr-0"
          >
            <ChevronLeftIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {carouselData.map((_, i) => (
              <div
                key={i}
                className={`${
                  i === idx ? "w-4" : "w-[9px]"
                } h-[9px] bg-gray-300 rounded-full cursor-pointer`}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="next project"
            onClick={next}
            className="w-[40px] h-[40px] text-neutral-300 border-neutral-300"
          >
            <ChevronRightIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};
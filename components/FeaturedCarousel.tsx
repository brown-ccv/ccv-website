"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getColorForTag } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image"


export interface FeaturedCarouselItem {
  title: string;
  category: string;
  description: string;
  image: string;
  websiteUrl?: string;
  viewMoreUrl?: string;
}
interface FeaturedCarouselProps {
  carouselData: FeaturedCarouselItem[];
  profileCardData: {
    icon?: React.ReactNode;
    name: string;
    organization: string;
  };
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  carouselData,
  profileCardData,
}) => {
  const [idx, setIdx] = useState(0);
  const currentItem = carouselData[idx];
  const { title, category, description, image, websiteUrl, viewMoreUrl } =
    currentItem;
  const { icon, name, organization } = profileCardData;

  const prev = () =>
    setIdx((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIdx((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  return (
    <section className="mt-12 mb-24">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="w-full max-w-[721px] space-y-6">
            <Badge
              color={getColorForTag(category)}
              className="rounded-full font-semibold text-xs"
            >
              {category}
            </Badge>
            <h3 className="text-[28px] font-semibold">{title}</h3>
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="flex items-center p-0">
                {icon && <div className="w-6 h-6 mr-3">{icon}</div>}
                <div>
                  <CardTitle className="text-lg leading-snug">{name}</CardTitle>
                  <CardDescription>{organization}</CardDescription>
                </div>
              </CardContent>
            </Card>
            <p className="text-xl font-normal text-gray-800">{description}</p>
            <div className="flex flex-wrap gap-4">
              {websiteUrl && (
                <Button
                  variant="primary_filled"
                  className="h-[55px] w-[155px] font-semibold text-xl self-start"
                  onClick={() => window.open(websiteUrl, "_blank")}
                >
                  Website
                </Button>
              )}
              {viewMoreUrl && (
                <Button
                  variant="primary_outlined"
                  className="h-[55px] w-[155px] font-semibold text-xl self-start"
                  onClick={() => window.open(viewMoreUrl, "_blank")}
                >
                  View More
                </Button>
              )}
            </div>
          </div>

          {/* Image */}
          <Card className="w-full max-w-[721px] min-h-[443px] border-none shadow-none">
            <CardContent className="flex items-center justify-center p-0 h-full">
              <Image src={image} alt={title} width="600" height="600" className="max-w-full max-h-full object-contain" />
            </CardContent>
          </Card>
        </div>

        {/* Pagination + Chevrons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8">
          {/* Prev button */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="previous project"
            onClick={prev}
            className="w-[40px] h-[40px]"
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
            className="w-[40px] h-[40px]"
          >
            <ChevronRightIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};
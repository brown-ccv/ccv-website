"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { getColorForTag } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Icon from "@/components/ui/render-icon";
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export interface FeaturedCarouselItem {
  title: string;
  categories: string[];
  description: string;
  image: string;
  attribution?: string;
  organizations?: {
    name: string;
    organization: string;
    pi?: string[];
    pm?: string;
    icon?: string;
  }[];
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
  const { title, categories, description, image, organizations, buttons } = currentItem;

  const prev = () =>
    setIdx((i) => (i === 0 ? carouselData.length - 1 : i - 1));
  const next = () =>
    setIdx((i) => (i === carouselData.length - 1 ? 0 : i + 1));

  return (
    <section className="mt-12 mb-24 sm:mx-2">
      <div className="w-full max-w-[2040px] px-2">
        <div className="flex flex-col xl:flex-row items-start justify-center gap-8 h-[600px] relative">
          {/* Text Content */}
          <div className="w-full max-w-[700px] space-y-6 pt-4 flex flex-col justify-between h-full">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, index) => (
                <Badge
                  key={index}
                  color={getColorForTag(cat)}
                  className="rounded-full font-semibold text-sm"
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <h3 className="text-3xl font-semibold">{title}</h3>
            
            {/* Organizations */}
            {organizations && organizations.length > 0 && (
              <div className="space-y-4">
                {organizations.map((org, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-6 h-6 mr-3">
                      <Icon iconName={org.icon} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xl leading-snug font-semibold">{org.name}</div>
                      <div className="text-md text-gray-600">{org.organization}</div>
                                              {(org.pi && org.pi.length > 0) && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span>PI: </span>
                            {org.pi?.map((pi, piIndex) => (
                              <span key={piIndex}>
                                {pi}
                                {piIndex < (org.pi?.length || 0) - 1 && <span>, </span>}
                              </span>
                            ))}
                            {org.pm && <span className="mx-2">•</span>}
                            {org.pm && <span>PM: {org.pm}</span>}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="text-xl font-normal text-gray-800 prose prose-lg max-w-none flex-1">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {description}
              </Markdown>
            </div>
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-auto">
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

          <div className="w-full max-w-[700px] space-y-6 lg:w-full lg:block h-full flex flex-col justify-start relative">
            <div>
              <Image
                src={image}
                alt={title}
                width={600}
                height={400}
                className="object-contain min-w-[700px] xs:hidden"
                style={{ width: '700px', height: '500px' }}
              />
            </div>
            
            {/* Attribution positioned at bottom-right of this div */}
            {currentItem.attribution && (
              <div className="absolute bottom-0 right-0 text-sm text-gray-600">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {currentItem.attribution}
                </Markdown>
              </div>
            )}
          </div>
        </div>

        {/* Pagination + Chevrons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8">
          {/* Prev button */}
          <Button
            variant="secondary_filled"
            size="icon"
            aria-label="previous project"
            onClick={prev}
            className="w-[40px] h-[40px] mr-0"
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
            variant="secondary_filled"
            size="icon"
            aria-label="next project"
            onClick={next}
            className="w-[40px] h-[40px] ml-0"
          >
            <ChevronRightIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};
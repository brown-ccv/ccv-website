"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/Badge"
import { getColorForTag } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import Icon from "@/components/ui/RenderIcon"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { useSwipeable } from "react-swipeable"

export interface FeaturedCarouselItem {
  title: string
  categories: string[]
  description: string
  image: string
  attribution?: string
  organizations?: {
    name: string
    organization: string
    pi?: string[]
    pm?: string
    icon?: string
  }[]
  buttons?: {
    text: string
    url: string
    variant:
      | "primary_filled"
      | "primary_outlined"
      | "secondary_filled"
      | "secondary_outlined"
  }[]
}

interface FeaturedCarouselProps {
  carouselData: FeaturedCarouselItem[]
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  carouselData,
}) => {
  const [idx, setIdx] = useState(0)
  const currentItem = carouselData[idx]
  const { title, categories, description, image, organizations, buttons } =
    currentItem

  const prev = () => setIdx((i) => (i === 0 ? carouselData.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === carouselData.length - 1 ? 0 : i + 1))

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: false,
    delta: 50, // Minimum distance for swipe
    swipeDuration: 500, // Maximum time for swipe
  })

  return (
    <section className="my-12">
      <div className="w-full mx-auto">
        {/* Carousel Container */}
        <div className="relative" {...handlers}>
          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="secondary_filled"
              size="icon"
              aria-label="previous project"
              onClick={prev}
              className="!mr-0"
            >
              <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
            </Button>

            {/* Pagination Dots */}
            <div className="flex gap-1">
              {carouselData.map((_, i) => (
                <div
                  key={i}
                  className={`${
                    i === idx ? "w-3" : "w-2"
                  } h-2 bg-neutral-300 rounded-full cursor-pointer transition-all duration-200`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>

            <Button
              variant="secondary_filled"
              size="icon"
              aria-label="next project"
              onClick={next}
              className="w-[40px] h-[40px] !mr-0"
            >
              <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-start gap-8 relative mt-8">
            {/* Text Content */}
            <div className="w-full max-w-[700px] space-y-6 flex flex-col justify-start">
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
              <h3 className="text-2xl lg:text-3xl font-semibold">{title}</h3>

              {/* Organizations */}
              {organizations && organizations.length > 0 && (
                <div className="space-y-4">
                  {organizations.map((org, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 mr-3">
                        <Icon iconName={org.icon} className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-lg lg:text-xl leading-snug font-semibold">
                          {org.name}
                        </div>
                        <div className="text-sm lg:text-md text-gray-600">
                          {org.organization}
                        </div>
                        {org.pi && org.pi.length > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            <span>PI: </span>
                            {org.pi?.map((pi, piIndex) => (
                              <span key={piIndex}>
                                {pi}
                                {piIndex < (org.pi?.length || 0) - 1 && (
                                  <span>, </span>
                                )}
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
              <div className="text-md lg:text-lg font-normal text-gray-800 prose prose-lg max-w-none flex-1">
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
                      size="lg"
                      className="font-semibold self-start whitespace-nowrap"
                      onClick={() => window.open(button.url, "_blank")}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Image Only */}
            <div className="hidden xl:block w-full max-w-[700px] lg:w-full h-full flex-col justify-center relative xl:ml-auto">
              <div className="min-w-[700px] relative">
                <Image
                  src={image}
                  alt={title}
                  width={600}
                  height={400}
                  className="object-contain"
                  style={{ width: "700px", height: "500px" }}
                />

                {/* Attribution if image requires it */}
                {currentItem.attribution && (
                  <div className="mt-2 text-right text-sm">
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
          </div>
        </div>
      </div>
    </section>
  )
}

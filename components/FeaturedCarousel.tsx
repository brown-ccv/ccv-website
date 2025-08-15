"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/Badge"
import { getColorForTag } from "@/lib/utils"
import { Button } from "@/components/button/Button"
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
      <div className="mx-auto w-full">
        {/* Carousel Container */}
        <div className="relative" {...handlers}>
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
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
                  } h-2 cursor-pointer rounded-full bg-neutral-300 transition-all duration-200`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>

            <Button
              variant="secondary_filled"
              size="icon"
              aria-label="next project"
              onClick={next}
              className="!mr-0 h-[40px] w-[40px]"
            >
              <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>

          <div className="relative mt-8 flex flex-col items-start justify-start gap-8 lg:flex-row">
            {/* Text Content */}
            <div className="flex w-full max-w-[700px] flex-col justify-start space-y-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => (
                  <Badge
                    key={index}
                    color={getColorForTag(cat)}
                    className="rounded-full text-sm font-semibold"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-semibold lg:text-3xl">{title}</h3>

              {/* Organizations */}
              {organizations && organizations.length > 0 && (
                <div className="space-y-4">
                  {organizations.map((org, index) => (
                    <div key={index} className="flex items-center">
                      <div className="mr-3 h-6 w-6">
                        <Icon iconName={org.icon} className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold leading-snug lg:text-xl">
                          {org.name}
                        </div>
                        <div className="text-sm text-gray-600 lg:text-md">
                          {org.organization}
                        </div>
                        {org.pi && org.pi.length > 0 && (
                          <div className="mt-1 text-sm text-gray-600">
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
              <div className="prose prose-lg max-w-none flex-1 text-md font-normal text-gray-800 lg:text-lg">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {description}
                </Markdown>
              </div>
              {buttons && buttons.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-4">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant}
                      size="lg"
                      className="self-start whitespace-nowrap font-semibold"
                      onClick={() => window.open(button.url, "_blank")}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Image Only */}
            <div className="relative hidden h-full w-full max-w-[700px] flex-col justify-center lg:w-full xl:ml-auto xl:block">
              <div className="relative min-w-[700px]">
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

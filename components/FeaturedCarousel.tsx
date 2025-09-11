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
    <section className="prose prose-sm lg:prose-base my-12">
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
            >
              <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Text Content */}
            <div className="flex w-full max-w-[700px] flex-col space-y-6">
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

              <h3>{title}</h3>

              {/* Organizations */}
              {organizations && organizations.length > 0 && (
                <div className="space-y-3">
                  {organizations.map((org, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Icon
                        iconName={org.icon}
                        className="h-6 w-6 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-semibold leading-snug">{org.name}</h5>
                        <p className="text-sm text-slate-600">{org.organization}</p>
                        {(org.pi?.length || org.pm) && (
                          <p className="text-sm text-slate-600">
                            {org.pi?.length && `PI: ${org.pi.join(", ")}`}
                            {org.pi?.length && org.pm && " • "}
                            {org.pm && `PM: ${org.pm}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="max-w-none flex-1">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {description}
                </Markdown>
              </div>

              {buttons && buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant}
                      size="lg"
                      className="whitespace-nowrap font-semibold"
                      onClick={() => window.open(button.url, "_blank")}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Image Only */}
            <div className="hidden w-full max-w-[700px] lg:block xl:ml-auto">
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
                <div className="mt-2 text-right">
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
    </section>
  )
}

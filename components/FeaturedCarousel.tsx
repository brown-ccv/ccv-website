"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/Badge"
import { getColorForTag } from "@/lib/utils"
import { Button } from "@/components/button/Button"
import { ButtonLink } from "@/components/button/ButtonLink"
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
  attribution?: {
    display_text: string
    href: string
  }[]
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
  const attribution = currentItem.attribution

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
    <section className="prose prose-sm my-12 lg:prose-base">
      <div className="mx-auto w-full">
        {/* Carousel Container */}
        <div className="relative" {...handlers}>
          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="secondary_filled"
              iconOnly={
                <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
              }
              aria-label="previous project"
              onClick={prev}
            />

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
              iconOnly={
                <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
              }
              aria-label="next project"
              onClick={next}
            />
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
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <h3>{title}</h3>

              {/* Organizations */}
              {organizations && organizations.length > 0 && (
                <div
                  className="space-y-3"
                  role="list"
                  aria-label={`${title} organizations`}
                >
                  {organizations.map((org, index) => (
                    <div
                      key={index}
                      className="not-prose flex items-center gap-2"
                      role="listitem"
                    >
                      <Icon
                        iconName={org.icon}
                        className="h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h4>{org.name}</h4>
                        <p className="text-sm text-slate-600">
                          {org.organization}
                        </p>
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
                    <ButtonLink
                      key={index}
                      variant={button.variant}
                      size="md"
                      className="whitespace-nowrap"
                      href={button.url}
                      external={true}
                    >
                      {button.text}
                    </ButtonLink>
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
              {attribution && attribution.length > 0 && (
                <div className="mt-2 text-right" aria-label="Image attribution">
                  {attribution.map((attributionItem, index) => (
                    <span key={index}>
                      <a
                        href={attributionItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={attributionItem.display_text}
                      >
                        {attributionItem.display_text}
                      </a>
                      {index < attribution.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

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

export interface CarouselItem {
  title: string
  categories: string[]
  description: string
  image: string
  alt: string
  attribution?: string
  organizations?: OrganizationItem[]
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

export interface CarouselProps {
  carouselData: CarouselItem[]
}

export interface OrganizationItem {
  name: string
  organization: string
  pi?: string[]
  pm?: string
  icon?: string
}

export interface DotsProps {
  carouselData: CarouselItem[]
  cardIndex: number
  setCardIndex: (index: number) => void
}

export const Dots = ({ carouselData, cardIndex, setCardIndex }: DotsProps) => {
  return (
    <div className="absolute bottom-5 flex w-full justify-center gap-2">
      {carouselData.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setCardIndex(idx)}
            className={`h-2 rounded-full transition-colors ${
              idx === cardIndex ? "w-3 bg-neutral-500" : "w-2 bg-neutral-300"
            }`}
            aria-label={`Go to slide ${idx + 1}: ${_.title}`}
            aria-current={cardIndex === idx ? "true" : "false"}
            title={_.title}
          />
        )
      })}
    </div>
  )
}

export const Organization = ({
  organization,
  pi,
  pm,
  name,
}: OrganizationItem) => {
  return (
    <div className="flex flex-col">
      <h4>{name}</h4>
      <p className="text-sm text-slate-600">{organization}</p>
      {(pi?.length || pm) && (
        <p className="text-sm text-slate-600">
          {pi?.length && `PI: ${pi.join(", ")}`}
          {pi?.length && pm && " • "}
          {pm && `PM: ${pm}`}
        </p>
      )}
    </div>
  )
}

export const Carousel: React.FC<CarouselProps> = ({ carouselData }) => {
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx((i) => (i === 0 ? carouselData.length - 1 : i - 1))
  const next = () => setIdx((i) => (i === carouselData.length - 1 ? 0 : i + 1))

  return (
    <div className="relative flex items-center gap-2 px-2 xl:px-8">
      {/* Previous button */}
      <Button
        variant="secondary_filled"
        className="group absolute left-5 top-1/2 z-10 flex-shrink-0 -translate-y-1/2 transform p-2 xl:left-14"
        size="icon"
        aria-label="previous project"
        onClick={prev}
      >
        <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>
      {/* Next button */}
      <Button
        variant="secondary_filled"
        className="group absolute right-5 top-1/2 z-10 flex-shrink-0 -translate-y-1/2 transform p-2 xl:right-14"
        size="icon"
        aria-label="next project"
        onClick={next}
      >
        <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>
      {/* Carousel Container */}
      <div className="relative flex min-h-[585px] w-full flex-col items-center justify-center overflow-hidden">
        {/*Carousel Items*/}
        {carouselData.map((carouselItem, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex h-full transform items-center justify-center gap-6 px-16 transition-transform xl:px-24 xxl:px-48 ${
              index === idx ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="max-w-1/2 flex w-full flex-col space-y-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {carouselItem.categories.map((cat, index) => (
                  <Badge
                    key={index}
                    color={getColorForTag(cat)}
                    className="rounded-full text-sm font-semibold"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <h3>{carouselItem.title}</h3>

              {/* Organizations */}
              {carouselItem.organizations &&
                carouselItem.organizations.length > 0 && (
                  <div
                    className="space-y-3"
                    role="list"
                    aria-label={`${carouselItem.title} organizations`}
                  >
                    {carouselItem.organizations.map((org, index) => (
                      <div
                        key={index}
                        className="not-prose flex gap-2"
                        role="listitem"
                      >
                        <Icon
                          iconName={org.icon}
                          className="mt-1 h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <Organization {...org} />
                      </div>
                    ))}
                  </div>
                )}

              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {carouselItem.description}
              </Markdown>
              {carouselItem.buttons && carouselItem.buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {carouselItem.buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant}
                      className="whitespace-nowrap"
                      onClick={() => window.open(button.url, "_blank")}
                      aria-label={`Open ${button.text}`}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            {/* Desktop Image Only */}
            <div className="max-w-1/3 flex w-full flex-col items-end justify-end">
              <figure>
                <Image
                  src={carouselItem.image}
                  priority={index === 0}
                  alt={carouselItem.alt}
                  width={600}
                  height={400}
                  className="aspect-video object-cover xl:w-[800px]"
                />
                {carouselItem.attribution ? (
                  <figcaption className="text-right">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {carouselItem.attribution}
                    </Markdown>
                  </figcaption>
                ) : null}
              </figure>
            </div>
          </div>
        ))}

        {/* Indicators */}
        <Dots
          carouselData={carouselData}
          cardIndex={idx}
          setCardIndex={setIdx}
        />
      </div>
    </div>
  )
}

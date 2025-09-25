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
import { Transition } from "motion"

export interface CarouselItem {
  title: string
  categories: string[]
  description: string
  image: string
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

export interface FeaturedCarouselProps {
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
    <div className="mt-4 flex w-full justify-center gap-2">
      {carouselData.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setCardIndex(idx)}
            className={`h-2 rounded-full transition-colors ${
              idx === cardIndex ? "w-3 bg-neutral-500" : "w-2 bg-neutral-300"
            }`}
          />
        )
      })}
    </div>
  )
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

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Previous button */}
      <Button
        variant="secondary_filled"
        className="group flex-shrink-0"
        size="icon"
        aria-label="previous project"
        onClick={prev}
      >
        <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>
      {/* Carousel Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/*Carousel Items*/}
        <div className="flex items-center justify-center">
          <div className="max-w-1/2 flex w-full flex-col space-y-6">
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
              <div
                className="space-y-3"
                role="list"
                aria-label={`${title} organizations`}
              >
                {organizations.map((org, index) => (
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
              {description}
            </Markdown>
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    className="whitespace-nowrap"
                    onClick={() => window.open(button.url, "_blank")}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {/* Desktop Image Only */}
          <div className="max-w-1/3 mx-auto hidden w-full items-center lg:flex lg:justify-end">
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

        {/* Indicators */}
        <Dots
          carouselData={carouselData}
          cardIndex={idx}
          setCardIndex={setIdx}
        />
      </div>
      {/* Next button */}
      <Button
        variant="secondary_filled"
        className="group flex-shrink-0"
        size="icon"
        aria-label="next project"
        onClick={next}
      >
        <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>
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
    <div>
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

"use client"

import React from "react"
import { Badge } from "@/components/ui/Badge"
import { getColorForTag } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel"
import Image from "next/image"
import Icon from "@/components/ui/RenderIcon"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import { ButtonLink } from "@/components/button/ButtonLink"

export interface StyledCarouselItem {
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

export interface StyledCarouselProps {
  carouselData: StyledCarouselItem[]
}

export interface OrganizationItem {
  name: string
  organization: string
  pi?: string[]
  pm?: string
  icon?: string
}

export interface DotsProps {
  carouselData: StyledCarouselItem[]
  cardIndex: number
  setCardIndex: (index: number) => void
}

export function Dots({ carouselData, cardIndex, setCardIndex }: DotsProps) {
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

export function Organization({ organization, pi, pm, name }: OrganizationItem) {
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

function FeatCarouselContent({
  title,
  description,
  image,
  alt,
  attribution,
  buttons,
  organizations,
  categories,
}: StyledCarouselItem) {
  return (
    <div className="flex items-center gap-8 p-1">
      <div className="flex w-full flex-col space-y-6">
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
              <div key={index} className="flex gap-2" role="listitem">
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
              <ButtonLink
                key={index}
                variant={button.variant}
                className="whitespace-nowrap"
                aria-label={`Open ${button.text}`}
                href={button.url}
              >
                {button.text}
              </ButtonLink>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Image Only */}
      <div className="max-w-1/3 flex w-full flex-col items-end justify-end">
        <figure>
          <Image
            src={image}
            // priority={index === 0}
            alt={alt}
            width={600}
            height={400}
            className="aspect-video object-cover xl:w-[800px]"
          />
          {attribution ? (
            <figcaption className="text-right">
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {attribution}
              </Markdown>
            </figcaption>
          ) : null}
        </figure>
      </div>
    </div>
  )
}

export function StyledCarousel({ carouselData }: StyledCarouselProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="">
        {carouselData.map((_, index) => (
          <CarouselItem key={index}>
            <FeatCarouselContent {..._} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

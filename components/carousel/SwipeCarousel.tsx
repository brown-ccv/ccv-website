"use client"
import React, { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Transition } from "motion"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import RenderIcon from "@/components/ui/RenderIcon"
import { Badge } from "@/components/ui/Badge"
import {
  Dots,
  StyledCarouselItem,
  Organization,
} from "@/components/carousel/StyledCarousel"
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledDialogTrigger,
} from "@/components/StyledDialog"
import ButtonLink from "@/components/button/ButtonLink"
import { Button } from "@/components/button/Button"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Icon from "@/components/ui/RenderIcon"
import { cn, getColorForTag } from "@/lib/utils"
import Image from "next/image"

const DRAG_BUFFER = 50

const SPRING_OPTIONS: Transition = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
}

interface CarouselProps {
  carouselData: StyledCarouselItem[]
  className?: string
}

export const SwipeCarousel = ({ carouselData, className }: CarouselProps) => {
  const [cardIndex, setCardIndex] = useState(0)

  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()

    if (x <= -DRAG_BUFFER && cardIndex < carouselData.length - 1) {
      setCardIndex((pv) => pv + 1)
    } else if (x >= DRAG_BUFFER && cardIndex > 0) {
      setCardIndex((pv) => pv - 1)
    }
  }

  return (
    <div className={cn("relative overflow-hidden py-8", className)}>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${cardIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Cards StyledCarouselItems={carouselData} cardIndex={cardIndex} />
      </motion.div>

      <Dots
        cardIndex={cardIndex}
        setCardIndex={setCardIndex}
        carouselData={carouselData}
      />
    </div>
  )
}

interface CardsProps {
  StyledCarouselItems: StyledCarouselItem[]
  cardIndex: number
}

const Cards = ({ StyledCarouselItems, cardIndex }: CardsProps) => {
  return (
    <>
      {StyledCarouselItems.map((item, idx) => {
        return (
          <motion.div
            key={idx}
            animate={{
              scale: cardIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
          >
            <Card className="bg-white">
              <CardContent className="flex flex-col p-0">
                <Image
                  className="max-h-3/4 aspect-video w-full shrink-0 rounded-t-xl bg-neutral-900 object-cover p-0"
                  width={800}
                  height={400}
                  src={item.image}
                  alt={item.alt}
                />
                <StyledDialog>
                  <StyledDialogTrigger className="m-3 flex w-auto items-start justify-between gap-2 rounded-xl bg-slate-100 px-3 py-2 hover:bg-slate-200">
                    <h3 className="min-w-0 flex-1 break-words text-left font-bold">
                      {item.title}
                    </h3>
                    <RenderIcon iconName="FaEllipsisV" />
                  </StyledDialogTrigger>
                  <StyledDialogCard {...item} />
                </StyledDialog>
                <div className="hidden break-words px-3 md:line-clamp-2">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item.description}
                  </Markdown>
                </div>
              </CardContent>
              <CardFooter className="p-3">
                <div className="flex flex-wrap gap-1">
                  {item.categories.map((cat, index) => (
                    <Badge
                      key={index}
                      color={getColorForTag(cat)}
                      className="rounded-full text-xs font-semibold"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )
      })}
    </>
  )
}

const StyledDialogCard = ({
  title,
  description,
  image,
  alt,
  attribution,
  buttons,
  organizations,
}: StyledCarouselItem) => {
  return (
    <StyledDialogContent className="max-h-3xl flex max-h-[95vh] w-[95vw] flex-col items-center overflow-y-auto rounded-xl border-none bg-white p-0 text-slate-600 sm:w-[90vw] md:w-[90vw] lg:max-w-3xl">
      <Image
        className="aspect-video w-full shrink-0 bg-neutral-900 object-cover"
        width={800}
        height={400}
        src={image}
        alt={alt}
      />
      {attribution && (
        <div className="mt-2 text-xs">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {attribution}
          </Markdown>
        </div>
      )}
      <StyledDialogTitle className="break-words pt-4 text-center text-xl font-bold">
        {title}
      </StyledDialogTitle>
      {/* Content */}
      <div className="flex flex-col items-center gap-10 break-words px-8">
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
                  className="w-45 mt-1 h-5 flex-shrink-0"
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
      </div>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-4 pb-4">
          {buttons.map((button, index) => (
            <ButtonLink
              key={index}
              variant={button.variant}
              className="whitespace-nowrap"
              external={true}
              href={button.url}
            >
              {button.text}
            </ButtonLink>
          ))}
        </div>
      )}
    </StyledDialogContent>
  )
}

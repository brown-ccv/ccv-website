"use client"
import React, { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Transition } from "motion"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  Dots,
  StyledCarouselItem,
  Organization,
} from "@/components/carousel/StyledCarousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/Dialog"
import { ButtonLink } from "@/components/button/ButtonLink"
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

export function SwipeCarousel({ carouselData, className }: CarouselProps) {
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
    <div className={cn("relative overflow-hidden pb-8", className)}>
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

function Cards({ StyledCarouselItems, cardIndex }: CardsProps) {
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
                <Dialog>
                  <DialogTrigger className="m-3 text-keppel-800">
                    <h3 className="line-clamp-2 min-w-0 flex-1 break-words text-left font-bold underline underline-offset-1">
                      {item.title}
                    </h3>
                  </DialogTrigger>
                  <DialogCard {...item} />
                </Dialog>
                <div className="hidden px-3 md:line-clamp-2">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {item.description}
                  </Markdown>
                </div>
              </CardContent>
              <CardFooter className="hidden gap-1 p-3 sm:flex sm:flex-wrap">
                {item.categories.map((cat, index) => (
                  <Badge
                    key={index}
                    color={getColorForTag(cat)}
                    className="rounded-full text-xs font-semibold"
                  >
                    {cat}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </motion.div>
        )
      })}
    </>
  )
}

function DialogCard({
  title,
  description,
  image,
  alt,
  attribution,
  buttons,
  organizations,
}: StyledCarouselItem) {
  const titleId = React.useId()
  const descriptionId = React.useId()
  return (
    <DialogContent
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="max-h-3xl flex max-h-[95vh] w-[95vw] flex-col items-center overflow-y-auto rounded-xl border-none bg-white p-0 text-slate-600 sm:w-[90vw] md:w-[90vw] lg:max-w-3xl"
    >
      <DialogDescription id={descriptionId} className="sr-only">
        {description}
      </DialogDescription>
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
      <DialogTitle
        id={titleId}
        className="break-words pt-4 text-center text-xl font-bold"
      >
        {title}
      </DialogTitle>
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
              href={button.url}
            >
              {button.text}
            </ButtonLink>
          ))}
        </div>
      )}
    </DialogContent>
  )
}

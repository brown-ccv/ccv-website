"use client"
import React, { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Transition } from "motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/Card"
import RenderIcon from "@/components/ui/RenderIcon"
import { Badge } from "@/components/ui/Badge"
import { Dots, CarouselItem, Organization } from "@/components/FeaturedCarousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { StyledCard } from "@/components/card/StyledCard"
import Image from "next/image"
import ButtonLink from "@/components/button/ButtonLink"
import { FaGithub, FaInfoCircle } from "react-icons/fa"
import { Button } from "@/components/button/Button"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import Icon from "@/components/ui/RenderIcon"

const DRAG_BUFFER = 50

const SPRING_OPTIONS: Transition = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
}

interface CarouselProps {
  carouselData: CarouselItem[]
}

export const SwipeCarousel = ({ carouselData }: CarouselProps) => {
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
    <div className="relative overflow-hidden py-8">
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
        <Cards carouselItems={carouselData} cardIndex={cardIndex} />
      </motion.div>

      <Dots
        cardIndex={cardIndex}
        setCardIndex={setCardIndex}
        carouselData={carouselData}
      />
      {/*<GradientEdges />*/}
    </div>
  )
}

interface CardsProps {
  carouselItems: CarouselItem[]
  cardIndex: number
}

const Cards = ({ carouselItems, cardIndex }: CardsProps) => {
  return (
    <>
      {carouselItems.map((item, idx) => {
        return (
          <motion.div
            key={idx}
            animate={{
              scale: cardIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="w-screen shrink-0 rounded-xl bg-neutral-800 object-cover"
          >
            <Card className="bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="aspect-video w-full shrink-0 rounded-t-xl bg-neutral-900 object-cover p-0"
                  ></div>
                  <div className="flex items-center justify-between px-3">
                    <h3 className="mt-2 font-bold">{item.title}</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="icon_only"
                          iconOnly={<RenderIcon iconName="FaEllipsisV" />}
                        />
                      </DialogTrigger>
                      <DialogCard {...item} />
                    </Dialog>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3">
                <div className="flex flex-wrap gap-1">
                  {item.categories.map((cat, index) => (
                    <Badge
                      key={index}
                      color="blue"
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

const DialogCard = ({
  title,
  description,
  image,
  attribution,
  categories,
  buttons,
  organizations,
}: CarouselItem) => {
  return (
    <DialogContent className="max-h-3xl flex h-[95vh] w-[95vw] flex-col items-center overflow-y-auto rounded-xl bg-white p-8 text-slate-600 sm:w-[90vw] md:w-[90vw] lg:h-[80vh] lg:max-w-3xl lg:p-24">
      <Image
        src={image}
        alt=""
        width={200}
        height={200}
        className="h-[200px] w-[200px] rounded-xl md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"
      />
      {/* Attribution if image requires it */}
      {attribution && (
        <div className="mt-2 text-right">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {attribution}
          </Markdown>
        </div>
      )}
      <DialogTitle className="py-4 text-2xl">{title}</DialogTitle>
      {/* Organizations */}
      {organizations && organizations.length > 0 && (
        <div
          className="space-y-3"
          role="list"
          aria-label={`${title} organizations`}
        >
          {organizations.map((org, index) => (
            <div key={index} className="not-prose flex gap-2" role="listitem">
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
              external={true}
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

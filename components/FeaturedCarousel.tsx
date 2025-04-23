"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getColorForTag } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import Provident from "@/components/assets/Provident"
import BrownLogo from "@/components/assets/BrownLogo"
import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "lucide-react"
import { ProfileCard } from "@/components/ProfileCard"

const featuredCarouselData = [
  {
    title: "PROVIDENT",
    category: "Public Health",
    description:
      "A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island.",
    image: Provident,
  },
  {
    title: "PROJECT 2",
    category: "Economics",
    description: "Hello world.",
    image: BrownLogo,
  },
]

export const FeaturedCarousel: React.FC = () => {
  const [idx, setIdx] = useState(0)
  const { title, category, description, image: ImageComp } =
    featuredCarouselData[idx]

  const prev = () =>
    setIdx((i) => (i === 0 ? featuredCarouselData.length - 1 : i - 1))
  const next = () =>
    setIdx((i) =>
      i === featuredCarouselData.length - 1 ? 0 : i + 1
    )

  return (
    <section className="mt-24 mb-24">
      <SectionHeader title="Featured Projects" align="center" />

      <div className="w-full px-[100px]">
        <div
          className={`
            grid items-center gap-y-12
            grid-cols-1

            /* ≥1212px: 5‑column, 2‑row layout */
            min-[1212px]:grid-cols-[auto_minmax(40px,1fr)_721px_minmax(40px,1fr)_auto]
            min-[1212px]:grid-rows-[auto_auto]

            /* ≥1952px: 7‑column, single‑row layout with 20px gap */
            min-[1952px]:grid-cols-[auto_minmax(40px,1fr)_721px_20px_721px_minmax(40px,1fr)_auto]
            min-[1952px]:grid-rows-[auto]
            min-[1952px]:gap-y-0
          `}
        >
          {/* Prev */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="previous project"
            onClick={prev}
            className={`
              w-[45px] h-[45px]
              min-[1212px]:row-span-2
              min-[1212px]:col-start-1
            `}
          >
            <ChevronLeftIcon className="h-12 w-12" strokeWidth={3} />
          </Button>
          <div
            className={`
              space-y-6
              w-[721px]
              mx-auto
              min-[1212px]:col-start-3
              min-[1212px]:row-start-1
            `}
          >

            <Badge
              color={getColorForTag(category)}
              className="rounded-full font-semibold text-xs"
            >
              {category}
            </Badge>
            <h3 className="text-[28px] font-semibold">{title}</h3>
            <ProfileCard
              icon={<UserIcon className="w-6 h-6" />}
              name="Brown School of Public Health"
              organization="People, Place and Health Collective"
            />
            <p className="text-xl font-normal text-gray-800">
              {description}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="primary_filled"
                className="h-[55px] w-[155px] font-semibold text-xl"
              >
                Website
              </Button>
              <Button
                variant="primary_outlined"
                className="h-[55px] w-[155px] font-semibold text-xl"
              >
                View More
              </Button>
            </div>
          </div>

          {/* Image */}
          <Card
            className={`
              w-[721px] h-[443px] border-none shadow-none mx-auto
              min-[1212px]:col-start-3
              min-[1212px]:row-start-2
              min-[1952px]:col-start-5
              min-[1952px]:row-start-1
            `}
          >
            <CardContent className="flex items-center justify-center p-0 h-full">
              <ImageComp className="max-w-full max-h-full" />
            </CardContent>
          </Card>

          {/* Next */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="next project"
            onClick={next}
            className={`
              w-[45px] h-[45px]
              min-[1212px]:row-span-2
              min-[1212px]:col-start-5
              min-[1952px]:col-start-7
            `}
          >
            <ChevronRightIcon className="h-12 w-12" strokeWidth={3} />
          </Button>
        </div>

        {/* pagination dots */}
        <div className="flex justify-center mt-8">
          {featuredCarouselData.map((_, i) => (
            <div
              key={i}
              className={`${
                i === idx ? "w-4" : "w-[9px]"
              } h-[9px] bg-gray-300 rounded-full mx-1`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

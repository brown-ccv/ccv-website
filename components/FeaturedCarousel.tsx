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

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="w-full max-w-[721px] space-y-6">
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
            <p className="text-xl font-normal text-gray-800">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary_filled"
                className="h-[55px] w-[155px] font-semibold text-xl self-start"
              >
                Website
              </Button>
              <Button
                variant="primary_outlined"
                className="h-[55px] w-[155px] font-semibold text-xl self-start"
              >
                View More
              </Button>
            </div>
          </div>

          {/* Image */}
          <Card className="w-full max-w-[721px] min-h-[443px] border-none shadow-none">
            <CardContent className="flex items-center justify-center p-0 h-full">
              <ImageComp className="max-w-full max-h-full" />
            </CardContent>
          </Card>
        </div>

        {/* Pagination + Chevrons */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-8">
          {/* Prev button */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="previous project"
            onClick={prev}
            className="w-[40px] h-[40px]"
          >
            <ChevronLeftIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
            {featuredCarouselData.map((_, i) => (
              <div
                key={i}
                className={`${
                  i === idx ? "w-4" : "w-[9px]"
                } h-[9px] bg-gray-300 rounded-full`}
              />
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="icon_only_outlined"
            size="icon"
            aria-label="next project"
            onClick={next}
            className="w-[40px] h-[40px]"
          >
            <ChevronRightIcon className="h-8 w-8" strokeWidth={2.5} />
          </Button>
        </div>

      </div>
    </section>
  )
}

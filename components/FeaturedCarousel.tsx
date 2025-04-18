"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/Badge"
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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? featuredCarouselData.length - 1 : prevIndex - 1
    )
  }

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === featuredCarouselData.length - 1 ? 0 : prevIndex + 1
    )
  }

  const ImageComponent = featuredCarouselData[currentProjectIndex].image

  return (
    <section className="w-full relative mt-[90px] flex items-center justify-center">

      <Button
        variant="icon_only"
        size="icon"
        iconOnly={<ChevronLeftIcon className="h-8 w-8" />}
        aria-label="left"
        className="absolute left-12 top-1/2 transform -translate-y-1/2 w-[45px] h-[45px] rounded-full bg-white border border-neutral-300 shadow-lg z-10"
        onClick={handlePrevProject}
      />

      <Button
        variant="icon_only"
        size="icon"
        iconOnly={<ChevronRightIcon className="h-8 w-8" />}
        aria-label="right"
        className="absolute right-12 top-1/2 transform -translate-y-1/2 w-[45px] h-[45px] rounded-full bg-white border border-neutral-300 shadow-lg z-10"
        onClick={handleNextProject}
      />

      <div className="w-full">
        <SectionHeader title="Featured Projects" align="center" />

        <div className="w-full h-[588px] bg-white mt-[60px] relative">
          <div className="flex justify-between px-12 max-w-screen-xl mx-auto">
            <div className="max-w-[440px]">
            <Badge
              color={getColorForTag(featuredCarouselData[currentProjectIndex].category)}
              className="rounded-full font-semibold text-xs"
            >
              {featuredCarouselData[currentProjectIndex].category}
            </Badge>


              <h3 className="font-semibold text-black text-[28px] mt-10">
                {featuredCarouselData[currentProjectIndex].title}
              </h3>

              <ProfileCard
                icon={<UserIcon className="w-6 h-6" />}
                name="Brown School of Public Health"
                organization="People, Place and Health Collective"
              />

              <p className="font-normal text-gray-800 text-xl mt-10">
                {featuredCarouselData[currentProjectIndex].description}
              </p>

              <div className="flex space-x-4 mt-14">
                <Button
                  className="h-[55px] w-[155px] rounded-[50px] font-semibold text-xl"
                  variant="primary_filled"
                >
                  Website
                </Button>

                <Button
                  variant="primary_outlined"
                  className="h-[55px] w-[155px] rounded-[50px] font-semibold text-xl"
                >
                  View More
                </Button>
              </div>
            </div>

            <Card className="w-[721px] h-[443px] border-none shadow-none">
              <CardContent className="p-0 flex justify-center">
                <ImageComponent />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex space-x-3">
              {featuredCarouselData.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentProjectIndex ? "w-4" : "w-[9px]"
                  } h-[9px] bg-gray-300 rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

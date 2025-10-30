import { StyledCarousel, StyledCarouselProps } from "./StyledCarousel"
import { SwipeCarousel } from "@/components/carousel/SwipeCarousel"
import React from "react"

export const FeaturedCarousel: React.FC<StyledCarouselProps> = ({
  carouselData,
}) => {
  return (
    <>
      <div className="px-page hidden py-8 lg:block">
        <StyledCarousel carouselData={carouselData} />
      </div>
      <SwipeCarousel className="lg:hidden" carouselData={carouselData} />
    </>
  )
}

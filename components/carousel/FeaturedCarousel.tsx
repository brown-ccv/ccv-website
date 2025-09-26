import { Carousel, CarouselProps } from "./Carousel"
import { SwipeCarousel } from "@/components/carousel/SwipeCarousel"
import React from "react"

export const FeaturedCarousel: React.FC<CarouselProps> = ({ carouselData }) => {
  return (
    <>
      <div className="hidden lg:block">
        <Carousel carouselData={carouselData} />
      </div>
      <SwipeCarousel className="lg:hidden" carouselData={carouselData} />
    </>
  )
}

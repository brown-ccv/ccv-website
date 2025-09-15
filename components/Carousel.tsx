"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/button/Button"

export interface FeaturedCarouselItem {
  title: string
  categories: string[]
  description: string
  image: string
  attribution?: string
  organizations?: {
    name: string
    organization: string
    pi?: string[]
    pm?: string
    icon?: string
  }[]
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

interface FeaturedCarouselProps {
  carouselData: FeaturedCarouselItem[]
  autoSlide?: boolean
  slideInterval?: number
  className?: string
}

export const Carousel: React.FC<FeaturedCarouselProps> = ({
  carouselData,
  autoSlide = false,
  slideInterval = 5000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const maxIndex = Math.max(0, carouselData.length - 3)

  // Auto slide functionality
  useEffect(() => {
    if (!autoSlide || isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, slideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, slideInterval, maxIndex, isHovered])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1))
  }

  const getVisibleItems = () => {
    const remainder = Math.min(carouselData.length - currentIndex, 3)
    const nextIndex = (currentIndex + 3) % carouselData.length

    return [
      ...carouselData.slice(currentIndex, currentIndex + remainder),
      ...carouselData.slice(0, 3 - remainder),
    ]
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel container */}
      <div className="relative h-80 overflow-hidden md:h-96">
        {/* Carousel items */}
        <div className="flex h-full justify-center p-4 transition-transform duration-700 ease-in-out">
          {getVisibleItems().map((item, index) => (
            <div
              key={`${item.title}-${currentIndex}-${index}`}
              className={`relative mx-2 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-500 ${
                index === 1 && 3 === 3
                  ? "z-10 w-80 scale-110 transform"
                  : "w-64 opacity-80"
              }`}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {/* Title */}
                <h3 className="mb-2 line-clamp-2 text-xl font-bold">
                  {item.title}
                </h3>

                {/* Meta info */}
                <div className="flex items-center space-x-3 text-sm text-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 transform space-x-3">
        {carouselData.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-3 bg-white"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Previous button */}
      <Button
        variant="secondary_filled"
        className="group absolute left-0 top-1/3 z-30"
        size="icon"
        aria-label="previous project"
        onClick={goToPrevious}
      >
        <ChevronLeftIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>

      {/* Next button */}
      <Button
        variant="secondary_filled"
        className="group absolute right-0 top-1/3 z-30"
        size="icon"
        aria-label="next project"
        onClick={goToNext}
      >
        <ChevronRightIcon className="h-6 w-6" strokeWidth={2.5} />
      </Button>
    </div>
  )
}

export default Carousel

"use client"

import React, { ReactNode } from "react"
import Image from "next/image"
import { TextAnimate } from "@/components/magicui/TextAnimate"
import { cn } from "@/lib/utils"

interface HeroProps {
  image?: string
  title?: string
  description?: string
  children?: ReactNode
  showGradient?: boolean
  titleClassName?: string
  descriptionClassName?: string
}

// Shared gradient overlay styles
const GRADIENT_OVERLAY_STYLE = {
  backgroundImage: [
    "linear-gradient(135deg, rgb(17 24 39) 0%, rgb(243 244 246) 100%)",
    "radial-gradient(circle at 0% 0%, #060839 0%, transparent 85%)",
    "radial-gradient(circle at 100% 100%, #060839 0%, transparent 85%)",
    "radial-gradient(circle at 70% 30%, #EC4899 0%, #8B5CF6 50%, transparent 70%)",
    "radial-gradient(circle at 30% 70%, #00b398 0%, transparent 60%)",
    "radial-gradient(ellipse at 50% 50%, #04c8a6 0%, transparent 40%)",
    "linear-gradient(135deg, #00b398 0%, transparent 30%, transparent 70%, #EC4899 100%)",
  ].join(", "),
  backgroundBlendMode:
    "overlay, multiply, multiply, overlay, soft-light, overlay, overlay",
}

// Shared content component
interface HeroContentProps {
  title?: string
  description?: string
  children?: ReactNode
  titleClassName: string
  descriptionClassName: string
  showGradient: boolean
  animated?: boolean
}

const HeroContent = ({
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
  showGradient,
  animated = false,
}: HeroContentProps) => {
  if (!showGradient) {
    return <>{children}</>
  }

  return (
    <div className="text-shadow-md flex w-full max-w-[1400px] flex-col gap-9">
      {title && <h1 className={titleClassName}>{title}</h1>}
      {description &&
        (animated ? (
          <TextAnimate
            as="p"
            className={descriptionClassName}
            animation="fadeIn"
            by="word"
            delay={0.2}
            duration={0.5}
          >
            {description}
          </TextAnimate>
        ) : (
          <p className={descriptionClassName}>{description}</p>
        ))}
      {children && (
        <div className="flex flex-col flex-wrap gap-2 pt-8 sm:flex-row sm:gap-4 md:pt-16">
          {children}
        </div>
      )}
    </div>
  )
}

// Base Hero wrapper component
interface HeroWrapperProps {
  children: ReactNode
  className: string
  image?: string
}

const HeroWrapper = ({ children, className, image }: HeroWrapperProps) => {
  const gradientOpacity = image ? "opacity-60" : ""
  const backgroundColor = image ? "" : "bg-black"
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden text-white ${className}`}
    >
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt="Hero background"
          fill
          priority
          className="object-cover object-[center_65%]"
          quality={90}
        />
      )}

      {/* Gradient Overlays */}
      <div className={cn("absolute inset-0 z-0", backgroundColor)}>
        {/* Base gradient - black to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className={cn("absolute inset-0 z-0", gradientOpacity)}>
          {/* Dark blue radial gradient - top left */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(6,8,57,0.8)_0%,_transparent_85%)]" />

          {/* Dark blue radial gradient - bottom right */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(6,8,57,0.8)_0%,_transparent_85%)]" />

          {/* Pink to purple radial gradient - upper right area */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(236,72,153,0.6)_0%,_rgba(139,92,246,0.4)_50%,_transparent_70%)] mix-blend-overlay" />

          {/* Teal radial gradient - lower left area */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(0,179,152,0.5)_0%,_transparent_60%)] opacity-55" />

          {/* Teal ellipse - center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(4,200,166,0.4)_0%,_transparent_40%)] opacity-25 mix-blend-soft-light" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-auto">{children}</div>
    </div>
  )
}

// Standard Hero Component
export const Hero = ({
  image,
  title,
  description,
  children,
  showGradient = true,
  titleClassName = "font-semibold drop-shadow-md xl:text-5xl",
  descriptionClassName = "text-xl drop-shadow-md xl:text-2xl",
}: HeroProps) => {
  return (
    <HeroWrapper
      className="p-12 sm:px-16 lg:px-14 lg:py-32 xl:px-20"
      image={image}
    >
      <HeroContent
        title={title}
        description={description}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        showGradient={showGradient}
      >
        {children}
      </HeroContent>
    </HeroWrapper>
  )
}

// Main Hero Component (with animations and different layout)
export const MainHero = ({
  image,
  title,
  description,
  children,
  showGradient = true,
  titleClassName = "font-semibold drop-shadow-md xl:text-5xl",
  descriptionClassName = "text-xl drop-shadow-md xl:text-2xl",
}: HeroProps) => {
  return (
    <HeroWrapper
      className="min-h-[clamp(1000px,50vh,60vh)] px-6 pb-52 md:px-14 xl:pl-36 xl:pr-96"
      image={image}
    >
      <HeroContent
        title={title}
        description={description}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        showGradient={showGradient}
        animated
      >
        {children}
      </HeroContent>
    </HeroWrapper>
  )
}

export default Hero

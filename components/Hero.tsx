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
  const gradientOpacity = image ? "opacity-55" : ""
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

      {/* Gradient Overlay */}
      <div
        className={cn("absolute inset-0 z-0", gradientOpacity)}
        style={GRADIENT_OVERLAY_STYLE}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
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
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
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
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
}: HeroProps) => {
  return (
    <HeroWrapper
      className="min-h-[clamp(1000px,50vh,60vh)] px-6 pb-16 pt-[12%] md:px-14 xl:pl-36 xl:pr-96"
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

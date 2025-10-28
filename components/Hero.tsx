"use client"

import React, { ReactNode } from "react"
import Image from "next/image"
import { TextAnimate } from "@/components/magicui/TextAnimate"

interface HeroProps {
  image?: string
  title?: string
  description?: string
  children?: ReactNode
  titleClassName?: string
  descriptionClassName?: string
}

// Shared content component
interface HeroContentProps {
  title?: string
  description?: string
  children?: ReactNode
  titleClassName: string
  descriptionClassName: string
  animated?: boolean
}

const HeroContent = ({
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
  animated = false,
}: HeroContentProps) => {
  return (
    <div className="text-shadow-md flex w-full max-w-[1400px] flex-col gap-6">
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
        <div className="flex flex-col flex-wrap gap-2 pt-4 sm:flex-row sm:gap-4">
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
  if (image) {
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
            className="object-cover object-center"
            quality={90}
          />
        )}

        {/* Gradient Overlay - Black to transparent */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black to-transparent" />

        {/* Content - Positioned at bottom */}
        <div className="relative z-10 mt-auto">{children}</div>
      </div>
    )
  }
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden text-white ${className}`}
    >
      {/* Gradient Overlays */}

      <div className={"absolute inset-0 z-0 bg-blue-navbar"}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        {/* Dark blue radial gradient - top left */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(6,8,57,0.8)_0%,_transparent_85%)]" />

        {/* Dark blue radial gradient - bottom right */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(6,8,57,0.8)_0%,_transparent_85%)]" />

        {/* Pink to purple radial gradient - upper right area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(236,72,153,0.6)_0%,_rgba(139,92,246,0.4)_50%,_transparent_80%)] opacity-85" />

        {/* Teal radial gradient - lower left area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(0,179,152,0.5)_0%,_transparent_60%)]" />

        {/* Teal ellipse - center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(4,200,166,0.4)_0%,_transparent_40%)] opacity-75 mix-blend-soft-light" />
      </div>

      {/* Content - Positioned at bottom */}
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
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
}: HeroProps) => {
  return (
    <HeroWrapper
      className="min-h-96 p-12 sm:px-16 lg:px-14 lg:pb-16 xl:px-20"
      image={image}
    >
      <HeroContent
        title={title}
        description={description}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
      >
        {children}
      </HeroContent>
    </HeroWrapper>
  )
}

// Main Hero Component (with animations)
export const MainHero = ({
  image,
  title,
  description,
  children,
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
}: HeroProps) => {
  return (
    <HeroWrapper
      className="min-h-screen px-6 pb-16 md:px-14 xl:pl-36 xl:pr-96"
      image={image}
    >
      <HeroContent
        title={title}
        description={description}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        animated
      >
        {children}
      </HeroContent>
    </HeroWrapper>
  )
}

export default Hero

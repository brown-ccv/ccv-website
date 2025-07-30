"use client"

import { ReactNode } from "react"
import { TextAnimate } from "@/components/magicui/TextAnimate"

interface HeroProps {
  image?: string
  title?: string
  description?: string
  children?: ReactNode
  showGradient?: boolean
  titleClassName?: string
  descriptionClassName?: string
}

export const Hero = ({
  image,
  title,
  description,
  children,
  showGradient = true,
  titleClassName = "font-bold text-white text-6xl md:text-8xl",
  descriptionClassName = "text-4xl font-semibold",
}: HeroProps) => {
  return (
    <div
      className="w-full min-h-[clamp(1000px,50vh,60vh)] bg-cover bg-[center_65%] relative flex flex-col overflow-hidden m-0 p-0"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgb(17 24 39) 0%, rgb(243 244 246) 100%),
          radial-gradient(circle at 0% 0%, #060839 0%, transparent 85%),
          radial-gradient(circle at 100% 100%, #060839 0%, transparent 85%),
          radial-gradient(circle at 70% 30%, #EC4899 0%, #8B5CF6 50%, transparent 70%),
          radial-gradient(circle at 30% 70%, #00b398 0%, transparent 60%),
          radial-gradient(ellipse at 50% 50%, #04c8a6 0%, transparent 40%),
          linear-gradient(135deg, #00b398 0%, transparent 30%, transparent 70%, #EC4899 100%),
          url(${image})
        `,
        backgroundSize:
          "cover, cover, cover, cover, cover, cover, cover, cover",
        backgroundBlendMode:
          "overlay, multiply, multiply, overlay, soft-light, overlay, overlay, normal",
      }}
    >
      {showGradient && (
        <div className="relative flex-1 flex items-start w-full pl-6 pr-6 md:pl-14 md:pr-14 lg:pl-36 lg:pr-96 z-5">
          <div className="flex flex-col text-white space-y-6 w-full pt-[12%] pb-16">
            {title && (
              <TextAnimate
                as="h1"
                duration={1}
                animation="slideLeft"
                by="character"
                className={titleClassName}
              >
                {title}
              </TextAnimate>
            )}
            {description && (
              <p className={descriptionClassName}>{description}</p>
            )}
            {children && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 pt-8 md:pt-16">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
      {!showGradient && children}
    </div>
  )
}

export default Hero

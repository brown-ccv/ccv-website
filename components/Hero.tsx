"use client"

import { ReactNode } from "react"
import { TextAnimate } from "@/components/magicui/text-animate"

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
  titleClassName = "font-bold text-5xl sm:text-6xl lg:text-7xl xxl:text-8xl",
  descriptionClassName = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold"
}: HeroProps) => {
  return (
    <div
      className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[clamp(1000px,50vh,60vh)] bg-cover bg-center relative flex flex-col m-0 p-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 0% 0%, #060839 0%, transparent 85%),
          radial-gradient(circle at 100% 100%, #060839 0%, transparent 85%),
          radial-gradient(circle at 70% 30%, #EC4899 0%, #8B5CF6 50%, transparent 70%),
          radial-gradient(circle at 30% 70%, #00b398 0%, transparent 60%),
          radial-gradient(ellipse at 50% 50%, #04c8a6 0%, transparent 40%),
          linear-gradient(135deg, #00b398 0%, transparent 30%, transparent 70%, #EC4899 100%),
          url(${image})
        `,
        backgroundSize: "cover, cover, cover, cover, cover, cover, cover",
        backgroundBlendMode: "multiply, multiply, overlay, soft-light, overlay, overlay, normal",
      }}
    >
      {showGradient && (
        <div className="relative flex-1 flex items-start w-full pl-6 pr-6 md:pl-14 md:pr-14 xl:pl-36 xl:pr-96 z-5">
          <div className="flex flex-col text-white space-y-6 w-full pt-[12%] pb-16 overflow-hidden max-w-[1400px]">
            {title && (
              <h1 className={titleClassName}>{title}</h1>
            )}
            {description && (
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
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
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
}: HeroProps) => {
  const hasImage = !!image
  const gradientOpacity = hasImage ? 0.4 : 1.0
  
  const backgroundImageStyles = [
    `linear-gradient(135deg, rgba(17, 24, 39, ${gradientOpacity}) 0%, rgba(243, 244, 246, ${gradientOpacity}) 100%)`,
    `radial-gradient(circle at 0% 0%, rgba(6, 8, 57, ${gradientOpacity}) 0%, transparent 85%)`,
    `radial-gradient(circle at 100% 100%, rgba(6, 8, 57, ${gradientOpacity}) 0%, transparent 85%)`,
    `radial-gradient(circle at 70% 30%, rgba(236, 72, 153, ${gradientOpacity}) 0%, rgba(139, 92, 246, ${gradientOpacity}) 50%, transparent 70%)`,
    `radial-gradient(circle at 30% 70%, rgba(0, 179, 152, ${gradientOpacity}) 0%, transparent 60%)`,
    `radial-gradient(ellipse at 50% 50%, rgba(4, 200, 166, ${gradientOpacity}) 0%, transparent 40%)`,
    `linear-gradient(135deg, rgba(0, 179, 152, ${gradientOpacity}) 0%, transparent 30%, transparent 70%, rgba(236, 72, 153, ${gradientOpacity}) 100%)`,
  ]

  if (image) {
    backgroundImageStyles.push(`url(${image})`)
  }

  return (
    <div
      className="relative flex w-full flex-col overflow-hidden bg-cover bg-[center_65%] p-12 text-white sm:px-16 lg:px-14 lg:py-32 xl:px-20"
      style={{
        backgroundImage: backgroundImageStyles.join(", "),
        backgroundSize: "cover",
        backgroundBlendMode:
          "overlay, multiply, multiply, overlay, soft-light, overlay, overlay, normal",
      }}
    >
      {showGradient ? (
        <div className="flex w-full max-w-[1400px] flex-col gap-9">
          {title && <h1 className={titleClassName}>{title}</h1>}
          {description && <p className={descriptionClassName}>{description}</p>}
          {children && (
            <div className="flex flex-col flex-wrap gap-2 pt-8 sm:flex-row sm:gap-4">
              {children}
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export const MainHero = ({
  image,
  title,
  description,
  children,
  showGradient = true,
  titleClassName = "font-semibold xl:text-5xl",
  descriptionClassName = "text-xl xl:text-2xl",
}: HeroProps) => {
  // Make gradients more transparent when there's a background image
  const hasImage = !!image
  const gradientOpacity = hasImage ? 0.4 : 1.0
  
  const backgroundImageStyles = [
    `linear-gradient(135deg, rgba(17, 24, 39, ${gradientOpacity}) 0%, rgba(243, 244, 246, ${gradientOpacity}) 100%)`,
    `radial-gradient(circle at 0% 0%, rgba(6, 8, 57, ${gradientOpacity}) 0%, transparent 85%)`,
    `radial-gradient(circle at 100% 100%, rgba(6, 8, 57, ${gradientOpacity}) 0%, transparent 85%)`,
    `radial-gradient(circle at 70% 30%, rgba(236, 72, 153, ${gradientOpacity}) 0%, rgba(139, 92, 246, ${gradientOpacity}) 50%, transparent 70%)`,
    `radial-gradient(circle at 30% 70%, rgba(0, 179, 152, ${gradientOpacity}) 0%, transparent 60%)`,
    `radial-gradient(ellipse at 50% 50%, rgba(4, 200, 166, ${gradientOpacity}) 0%, transparent 40%)`,
    `linear-gradient(135deg, rgba(0, 179, 152, ${gradientOpacity}) 0%, transparent 30%, transparent 70%, rgba(236, 72, 153, ${gradientOpacity}) 100%)`,
  ]

  if (image) {
    backgroundImageStyles.push(`url(${image})`)
  }

  return (
    <div
      className="relative flex min-h-[clamp(1000px,50vh,60vh)] w-full flex-col overflow-hidden bg-cover bg-[center_65%] px-6 pb-16 pt-[12%] text-white md:px-14 xl:pl-36 xl:pr-96"
      style={{
        backgroundImage: backgroundImageStyles.join(", "),
        backgroundSize: "cover",
        backgroundBlendMode:
          "overlay, multiply, multiply, overlay, soft-light, overlay, overlay, normal",
      }}
    >
      {showGradient ? (
        <div className="flex w-full max-w-[1400px] flex-col gap-9">
          {title && <h1 className={titleClassName}>{title}</h1>}
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
            <div className="flex flex-col flex-wrap gap-2 pt-8 sm:flex-row sm:gap-4 md:pt-16">
              {children}
            </div>
          )}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Hero

import { ReactNode } from "react"
import { TextAnimate } from "./magicui/text-animate"

interface HeroProps {
  image: string
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
  titleClassName = "font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
  descriptionClassName = "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold"
}: HeroProps) => {
  return (
    <div
      className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[clamp(1000px,50vh,60vh)] bg-cover bg-center relative flex flex-col m-0 p-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
      }}
    >
      {showGradient && (
        <div className="relative flex-1 flex items-start w-full px-6 sm:px-8 md:px-12 lg:px-32 xl:px-40 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
          <div className="flex flex-col text-white space-y-6 w-full pt-[12%] pb-16 overflow-hidden max-w-[1400px]">
            {title && (
              <TextAnimate
                as="h1"
                className={`${titleClassName} break-words`}
                animation="fadeIn"
                by="word"
                delay={0.2}
                duration={0.5}
              >
                {title}
              </TextAnimate>
            )}
            {description && (
              <p className={`${descriptionClassName} break-words`}>
                {description}
              </p>
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
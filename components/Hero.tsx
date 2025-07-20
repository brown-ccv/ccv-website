import { ReactNode } from "react"

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
  titleClassName = "font-bold text-6xl md:text-8xl",
  descriptionClassName = "text-4xl font-semibold"
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
        <div className="relative flex-1 flex items-start w-full px-[4vw] sm:px-[3vw] md:px-[2vw] lg:px-36 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
          <div className="flex flex-col text-white space-y-6 w-full pt-[12%] pb-16 overflow-hidden">
            {title && (
              <h1 className={`${titleClassName} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl break-words`}>
                {title}
              </h1>
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
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
      className="w-full min-h-[clamp(1000px,50vh,60vh)] bg-cover bg-center relative flex flex-col overflow-hidden m-0 p-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 0% 0%, #060839 0%, transparent 85%),
          radial-gradient(circle at 100% 100%, #060839 0%, transparent 85%),
          radial-gradient(circle at 50% 50%, #060839 0%, transparent 40%),
          linear-gradient(135deg, #060839 0%, #8B5CF6 40%, #EC4899 60%, #060839 100%),
          url(${image})
        `,
        backgroundSize: "cover, cover, cover, cover, cover",
        backgroundBlendMode: "multiply, multiply, multiply, overlay, normal",
      }}
    >
      {showGradient && (
        <div className="relative flex-1 flex items-start w-full pl-6 pr-6 md:pl-14 md:pr-14 lg:pl-36 lg:pr-96 bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5">
          <div className="flex flex-col text-white space-y-6 w-full pt-[12%] pb-16">
            {title && (
              <h1 className={titleClassName}>
                {title}
              </h1>
            )}
            {description && (
              <p className={descriptionClassName}>
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
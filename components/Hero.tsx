import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface HeroProps {
  image?: string;
  children: ReactNode;
  height?: string;
}

export const Hero = ({
  image,
  children,
  height,
}: HeroProps) => {
  const defaultHeight = "h-[clamp(800px,50vh,60vh)]";
  const effectiveHeight = height || defaultHeight;
  const baseClasses = "w-full bg-cover bg-center relative flex flex-col overflow-hidden m-0 p-0";

  const style = image
    ? { backgroundImage: `url(${image})`, backgroundSize: "cover" }
    : {};

  return (
    <div
      className={cn(baseClasses, effectiveHeight, {
        'bg-blue-navbar bg-gradient-to-t from-black/0 via-black/10 to-black/65 z-5': !image,
      })}
      style={style}
    >
      {children}
    </div>
  )
}

export default Hero
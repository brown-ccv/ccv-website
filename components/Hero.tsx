import { ReactNode } from "react"

export const Hero = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="w-full h-[1200px] bg-cover bg-center relative flex flex-col overflow-hidden m-0 p-0"
      style={{
        backgroundImage: `url(/static/images/hero-landing.jpeg)`,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  )
}

export default Hero

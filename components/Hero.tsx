import { ReactNode } from "react"

export const Hero = ({
  image,
  children,
}: {
  image: string
  children: ReactNode
}) => {
  return (
    <div
      className="w-full h-[50vh] md:h-[60vh] bg-cover bg-center relative flex flex-col overflow-hidden m-0 p-0"
      style={{
        backgroundImage: image,
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  )
}

export default Hero

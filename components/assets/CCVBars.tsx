import Image from "next/image"
import CCVBarsImage from "@/assets/CCVBars.png"

export default function CCVBars({ className }: { className?: string }) {
  return (
    <Image
      className={`m-0 p-0 ${className || ""}`}
      src={CCVBarsImage}
      alt="CCVBars"
      width={100}
      height={50}
    />
  )
}

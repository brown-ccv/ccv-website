import Image from "next/image"
import CCVBarsImage from "@/assets/CCVBars.png"

export default function CCVBars({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src={CCVBarsImage}
      alt=""
      width={100}
      height={50}
    />
  )
}

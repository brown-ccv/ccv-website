import Image from "next/image"
import CBCBarsImage from "@/assets/CBCBars.png"
import { cn } from "@/lib/utils"

export default function CCVBars({ className }: { className?: string }) {
  return (
    <Image
      className={cn("mb-4", className)}
      src={CBCBarsImage}
      alt="CBCBars"
      width={100}
      height={50}
    />
  )
}

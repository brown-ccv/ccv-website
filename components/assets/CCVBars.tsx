import Image from "next/image"
import CCVBarsImage from "@/assets/CCVBars.png"
import { cn } from "@/lib/utils"

export default function CCVBars({ className }: { className?: string }) {
  return (
    <Image
      className={cn("my-4 py-4", className)}
      src={CCVBarsImage}
      alt=""
      width={100}
      height={50}
    />
  )
}

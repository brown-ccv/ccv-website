import { cn } from "@/lib/utils"
import React from "react"

interface ReviewCardProps {
  img?: string
  name: string
  department: string
  review?: string
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  img,
  name,
  department,
  review,
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img ? img : "https://avatar.vercel.sh/jack"}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{name}</figcaption>
          <p className="text-xs font-medium">{department}</p>
        </div>
      </div>
      {review && <blockquote className="mt-2 text-sm">{review}</blockquote>}
    </figure>
  )
}

export default ReviewCard

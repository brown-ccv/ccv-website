"use client"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverCardPortal,
} from "@/components/ui/HoverCard"

interface ReviewCardProps {
  img?: string
  name: string
  department: string
  review?: string
}

interface CollabCardProps extends ReviewCardProps {
  className?: string
}

const CollabCard: React.FC<CollabCardProps> = ({
  img,
  name,
  department,
  review,
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState(img)

  const handleError = () => {
    setImgSrc("https://avatar.vercel.sh/jack")
  }
  return (
    <figure
      className={cn(
        "relative h-full w-[420px] overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={imgSrc ? imgSrc : "https://avatar.vercel.sh/jack"}
          alt=""
          width={32}
          height={32}
          onError={handleError}
          className="h-[32px] w-[32px] rounded-full object-cover"
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

const ReviewCard: React.FC<ReviewCardProps> = ({
  img,
  name,
  department,
  review,
}) => {
  if (review) {
    const words = review.trim().split(/\s+/)
    const truncatedReview =
      words.slice(0, 20).join(" ") + (words.length > 12 ? "..." : "")
    return (
      <HoverCard>
        <HoverCardTrigger>
          <CollabCard
            img={img}
            name={name}
            department={department}
            review={truncatedReview}
            className="cursor-pointer"
          />
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent className="w-96 bg-white">
            <blockquote className="mt-2 text-sm">{review}</blockquote>
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>
    )
  }
  return <CollabCard img={img} name={name} department={department} />
}

export default ReviewCard

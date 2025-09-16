"use client"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import Image from "next/image"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

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
  return (
    <figure
      className={cn(
        "relative h-full min-h-[120px] w-[300px] overflow-hidden rounded-xl border p-4 text-left md:w-[420px]",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        className
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={img ? img : "https://avatar.vercel.sh/jack"}
          alt=""
          width={32}
          height={32}
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
  const [imgSrc, setImgSrc] = useState(img)

  const handleError = () => {
    setImgSrc("https://avatar.vercel.sh/jack")
  }
  if (review) {
    const words = review.trim().split(/\s+/)
    const truncatedReview =
      words.slice(0, 20).join(" ") + (words.length > 12 ? "..." : "")
    return (
      <Dialog>
        <DialogTrigger>
          <CollabCard
            img={img}
            name={name}
            department={department}
            review={truncatedReview}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogTitle>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={img ? img : "https://avatar.vercel.sh/jack"}
                alt=""
                width={40}
                height={40}
                className="h-[40px] w-[40px] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium">{name}</figcaption>
                <p className="text-xs font-medium">{department}</p>
              </div>
            </div>
          </DialogTitle>
          <blockquote className="mt-2 text-sm">{review}</blockquote>
        </DialogContent>
      </Dialog>
    )
  }
  return <CollabCard img={img} name={name} department={department} />
}

export default ReviewCard

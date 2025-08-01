"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"

import { FaGithub, FaInfoCircle, FaTimes } from "react-icons/fa"
import ButtonLink from "@/components/ui/ButtonLink"

interface PeopleCardProps {
  className?: string
  imagePath: string
  hoverImagePath?: string
  name: string
  title: string
  personDetails?: {
    name: string
    title: string
    team?: string
    subteam?: string
    type?: string
    github_username?: string
    brown_directory_uuid?: string
    bio?: string
    image?: string
  }
}

export const PeopleCard: React.FC<PeopleCardProps> = ({
  imagePath,
  hoverImagePath,
  name,
  title,
  personDetails,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-keppel-600"
        >
          <Card className="w-[350px] sm:w-[400px] h-[525px] sm:h-[600px] flex-shrink-0 border-none shadow-none">
            <CardContent className="flex flex-col h-full items-center">
              <Image
                src={isHovered && hoverImagePath ? hoverImagePath : imagePath}
                alt={name}
                width="500"
                height="500"
                className="rounded-full transition-opacity duration-300 h-[306px] w-[306px] sm:h-[350px] sm:w-[350px]"
                style={{ margin: 0, padding: 0 }}
              />
              <CardTitle className="text-2xl text-center py-4">
                {name}
              </CardTitle>
              <CardDescription className="text-xl italic text-center">
                {title}
              </CardDescription>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <DialogContent className="justify-center text-center text-neutral-500 bg-white flex flex-col items-center rounded-xl h-[95vh] w-[95vw] sm:w-[90vw] md:w-[90vw] lg:max-w-3xl overflow-y-auto">
        <Image
          src={imagePath}
          alt={name}
          width={180}
          height={180}
          className="rounded-full md:h-[250px] md:w-[250px]"
        />
        <DialogTitle className="py-4 text-3xl font-bold">
          {personDetails?.name || name}
        </DialogTitle>
        <p className="text-2xl text-neutral-700 mb-2">
          {personDetails?.title || title}
        </p>
        {personDetails?.team && (
          <p className="text-lg -mb-2">{personDetails.team}</p>
        )}
        {personDetails?.subteam && (
          <p className="text-lg italic">{personDetails.subteam}</p>
        )}
        <div className="flex gap-4">
          {personDetails?.github_username &&
            personDetails.github_username !== "" && (
              <ButtonLink
                href={`https://github.com/${personDetails.github_username}`}
                external
                title="GitHub Profile"
                className="w-10 h-10 p-1 text-3xl hover:text-keppel-700"
              >
                <FaGithub />
              </ButtonLink>
            )}
          {personDetails?.brown_directory_uuid &&
            personDetails.brown_directory_uuid !== "" && (
              <ButtonLink
                href={`https://directory.brown.edu/uuid/${personDetails.brown_directory_uuid}`}
                external
                title="Brown Directory"
                className="w-10 h-10 p-1 text-3xl hover:text-keppel-700"
              >
                <FaInfoCircle />
              </ButtonLink>
            )}
        </div>
        {personDetails?.bio && (
          <div className="mt-4 text-lg text-neutral-800">
            {personDetails.bio}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

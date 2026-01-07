"use client"

import React, { useState } from "react"
import Image from "next/image"
import { CardDescription, CardTitle } from "@/components/ui/Card"
import { StyledCard } from "@/components/card/StyledCard"
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
  StyledDialogTrigger,
} from "@/components/StyledDialog"

import { FaGithub, FaInfoCircle } from "react-icons/fa"
import ButtonLink from "@/components/button/ButtonLink"

interface PeopleCardProps {
  className?: string
  imagePath: string
  hoverImagePath?: string
  name: string
  title: string
  personDetails?: {
    display_name: string
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
    <StyledDialog>
      <StyledDialogTrigger asChild>
        <button
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-keppel-600"
        >
          <StyledCard
            size="custom"
            className="w-80 border-none shadow-none sm:w-96"
          >
            <div className="flex h-full flex-col items-center">
              <Image
                src={isHovered && hoverImagePath ? hoverImagePath : imagePath}
                alt=""
                width="200"
                height="200"
                className="h-[200px] w-[200px] rounded-full transition-opacity duration-300 md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"
                style={{ margin: 0, padding: 0 }}
              />
              <CardTitle className="py-4 text-center">{name}</CardTitle>
              <CardDescription className="text-center italic">
                {title}
              </CardDescription>
            </div>
          </StyledCard>
        </button>
      </StyledDialogTrigger>
      <StyledDialogContent className="max-h-3xl flex h-[95vh] w-[95vw] flex-col items-center overflow-y-auto rounded-xl bg-white p-8 text-center text-slate-600 sm:w-[90vw] md:w-[90vw] lg:h-[80vh] lg:max-w-3xl lg:p-24">
        <Image
          src={imagePath}
          alt=""
          width={200}
          height={200}
          className="h-[200px] w-[200px] rounded-full md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"
        />
        <StyledDialogTitle className="py-4 text-2xl">
          {personDetails?.display_name}
        </StyledDialogTitle>
        <p className="text-xl font-normal">{personDetails?.title || title}</p>
        {personDetails?.team && (
          <p className="-mb-2 text-lg font-semibold">{personDetails.team}</p>
        )}
        {personDetails?.subteam && (
          <p className="italic">{personDetails.subteam}</p>
        )}
        <div className="flex gap-8">
          {personDetails?.github_username &&
            personDetails.github_username !== "" && (
              <ButtonLink
                href={`https://github.com/${personDetails.github_username}`}
                variant={"icon"}
                size={"icon"}
                icon={<FaGithub />}
                external
                title="GitHub Profile"
                className="text-3xl hover:text-keppel-700"
              ></ButtonLink>
            )}
          {personDetails?.brown_directory_uuid &&
            personDetails.brown_directory_uuid !== "" && (
              <ButtonLink
                href={`https://directory.brown.edu/uuid/${personDetails.brown_directory_uuid}`}
                variant={"icon"}
                size={"icon"}
                external
                icon={<FaInfoCircle className="text-3xl" />}
                title="Brown Directory"
                className="text-3xl hover:text-keppel-700"
              ></ButtonLink>
            )}
        </div>
        {personDetails?.bio && <div className="mt-4">{personDetails.bio}</div>}
      </StyledDialogContent>
    </StyledDialog>
  )
}

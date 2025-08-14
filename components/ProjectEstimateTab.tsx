import React from "react"
import Image from "next/image"
import Icon from "@/components/ui/RenderIcon"
import ButtonLink from "@/components/button/ButtonLink"

interface ProjectEstimateTabProps {
  title: string
  description: string
  group: string
  time: string
  link?: string
  goal: string
  image: string
  alt: string
}

export const ProjectEstimateTab: React.FC<ProjectEstimateTabProps> = ({
  title,
  description,
  group,
  time,
  link,
  goal,
  image,
  alt,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-between lg:flex-row  gap-4">
        {/*Project Section*/}
        <div>
          <h3>{title}</h3>
          <div className="flex items-center gap-4">
            <Icon iconName="FaUser" className="w-6 h-6" />
            <p className="text-lg lg:text-xl leading-snug font-semibold">
              {group}
            </p>
          </div>
          {/* Time to Complete */}
          <div className="flex items-center gap-4">
            <Icon iconName="FaClock" className="w-6 h-6 text-keppel-700" />
            <p className="text-lg lg:text-lg font-semibold">{time}</p>
          </div>
          <p>{description}</p>
          {link && (
            <ButtonLink href={link} external={true} title={title} size="md" />
          )}
        </div>
        {/*Image*/}
        <div className="relative w-full flex justify-end">
          <Image
            height={600}
            width={600}
            src={image}
            alt={alt}
            className="object-center"
          />
        </div>
      </div>
      <p>{goal}</p>
    </div>
  )
}

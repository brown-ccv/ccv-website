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
  image?: string
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
    <div className="prose prose-sm lg:prose-base flex flex-col">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        {/*Project Section*/}
        <div>
          <h3>{title}</h3>
          {/* Group Name */}
          <div className="flex items-center gap-2">
            <Icon iconName="FaUser" className="h-6 w-6" />
            <span className="font-semibold">{group}</span>
          </div>
          {/* Time to Complete */}
          <div className="flex items-center gap-2 mt-2">
            <Icon iconName="FaClock" className="h-6 w-6 text-keppel-700" />
            <span className="font-semibold">{time}</span>
          </div>
          <p>{description}</p>
          {link && (
            <ButtonLink href={link} external={true} title={title} size="md" />
          )}
        </div>
        {/*Image*/}
        {image && image.trim() !== "" && (
          <div className="relative flex w-full justify-end">
            <Image
              height={600}
              width={600}
              src={image}
              alt={alt}
              className="object-center"
            />
          </div>
        )}
      </div>
      <p>{goal}</p>
    </div>
  )
}

import React from "react"
import Image from "next/image"
import Icon from "@/components/ui/RenderIcon"
import ButtonLink from "@/components/button/ButtonLink"

interface ProjectEstimateTabProps {
  title: string
  description: string
  group: string
  fte: string
  link?: string
  goal: string
  image?: string
  alt: string
}

export const ProjectEstimateTab: React.FC<ProjectEstimateTabProps> = ({
  title,
  description,
  group,
  fte,
  link,
  goal,
  image,
  alt,
}) => {
  return (
    <div className="prose prose-sm flex flex-col lg:prose-base md:inline">
      {/*Image*/}
      {image && image.trim() !== "" && (
        <Image
          height={400}
          width={400}
          src={image}
          alt={alt}
          className="float-right"
        />
      )}
      <h3>{title}</h3>
      {/* Group Name */}
      <div className="flex items-center gap-2">
        <span className="font-semibold italic">{group}</span>
      </div>
      {/* FTE Percentage info */}
      <div className="mt-2 flex items-center gap-2">
        <Icon iconName="FaUser" className="h-6 w-6" />
        <span className="font-semibold">{fte} FTE</span>
      </div>

      <p>{description}</p>
      {link && (
        <ButtonLink href={link} external={true} title={title} size="md" />
      )}
      <h4>CCV's Role</h4>
      <p>{goal}</p>
    </div>
  )
}

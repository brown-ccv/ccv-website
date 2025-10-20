import React from "react"
import Image from "next/image"
import Icon from "@/components/ui/RenderIcon"
import ButtonLink from "@/components/button/ButtonLink"

interface ProjectEstimateTabProps {
  title: string
  description: string
  group: string
  pi?: string
  link?: string
  goal: string
  image?: string
  attribution?: string
  alt?: string
}

export const ProjectEstimateTab: React.FC<ProjectEstimateTabProps> = ({
  title,
  description,
  group,
  pi, 
  link,
  goal,
  image,
  attribution,
  alt,
}) => {
  return (
    <div className="prose prose-sm flex flex-col lg:prose-base md:inline">
      {/*Image*/}
      {image && image.trim() !== "" && (
        <figure className="float-right">
          <Image
            height={400}
            width={400}
            src={image}
            alt={alt ?? ''}
          />
          {attribution ? <figcaption className="text-right">{attribution}</figcaption> : null}
        </figure>
      )}
      <h3 className="text-xl">{title}</h3>
      <p className="font-semibold italic">{group}{pi ? `, ${pi}`: ''}</p>
      <p>{description}</p>
      {link && (
        <ButtonLink href={link} external={true} title={title} size="md" />
      )}
      <h4 className="text-lg">CCV's Role</h4>
      <p>{goal}</p>
    </div>
  )
}

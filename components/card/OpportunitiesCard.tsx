import React from "react"
import { StyledCard } from "@/components/card/StyledCard"
import ButtonLink from "@/components/button/ButtonLink"
import Icon from "@/components/ui/RenderIcon"

interface PositionProps {
  title: string
  externalPath: string
}

interface OpportunitiesCardProps {
  position: PositionProps
}

export const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ position }) => {
  return (
    <ButtonLink
      key={position.externalPath}
      external
      href={`https://brown.wd5.myworkdayjobs.com/en-US/staff-careers-brown${position.externalPath}`}
      className="w-full"
      size="md"
    >
      <StyledCard size="custom" className="w-full mb-16">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p className="flex items-center pt-2 gap-x-2 font-normal">
              <Icon iconName="FaMapMarkerAlt"/>
              Providence, RI - United States
            </p>
            <p className="font-normal">
              {position.title}
            </p>
          </div>
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <span>Learn More</span>
            <Icon iconName="FaArrowRight" />
          </div>
        </div>
      </StyledCard>
    </ButtonLink>
  )
}

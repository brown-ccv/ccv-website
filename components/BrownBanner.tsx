import React from "react"
import { FaComments } from "react-icons/fa"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/button/ButtonLink"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-white px-4 py-2 lg:py-4">
      <a
        href="https://it.brown.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 lg:border-r lg:border-neutral-900 lg:p-4"
      >
        <BrownLogo width={150} className="sm:w-[200px]" />
        <span className="sr-only">OIT Home</span>
      </a>

      <h1 className="hidden pl-6 text-3xl font-semibold lg:flex lg:flex-1 lg:justify-start">
        Center for Computation and Visualization
      </h1>

      <ButtonLink
        href="mailto:ccv-support@brown.edu"
        external={true}
        variant="red_outlined"
        size="sm"
        className={"px-2 py-6 sm:px-4"}
      >
        <FaComments className="text-xl sm:text-2xl" />
        Work with Us
      </ButtonLink>
    </header>
  )
}

export default BrownBanner

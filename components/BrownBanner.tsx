import React from "react"
import { FaComments } from "react-icons/fa"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/button/ButtonLink"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = () => {
  return (
    <header className="bg-white flex flex-row items-center justify-between py-2 lg:py-4 px-4">
      <div className="flex-shrink-0 p-4 lg:border-r lg:border-neutral-900">
        <a
          href="https://it.brown.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BrownLogo width={150} className="sm:w-[200px]" />
          <span className="sr-only">OIT Home</span>
        </a>
      </div>
      <h1 className="pl-6 text-3xl font-semibold hidden lg:flex-1 lg:flex lg:justify-start">
        Center for Computation and Visualization
      </h1>

      <ButtonLink
        href="mailto:ccv-support@brown.edu"
        external={true}
        variant="red_outlined"
        className={"py-6 px-2 sm:px-4"}
      >
        <FaComments className="mr-1 sm:mr-2 text-xl sm:text-2xl" />
        <span className="sm:inline">Work with Us</span>
      </ButtonLink>
    </header>
  )
}

export default BrownBanner

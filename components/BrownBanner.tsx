import React from "react"
import { FaComments } from "react-icons/fa"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/button/ButtonLink"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = () => {
  return (
    <header className="bg-white flex items-center py-2 px-6">
      <div className="flex flex-row items-center w-full">
        <ButtonLink
          href="https://it.brown.edu"
          external={true}
          className={"focus-visible:ring-0"}
        >
          <BrownLogo />
          <span className="sr-only">OIT Home</span>
        </ButtonLink>
        <div className="ml-6 w-full flex flex-row justify-between items-center">
          <h1 className="py-10 pl-6 text-3xl font-semibold border-l border-black hidden lg:block">
            Center for Computation and Visualization
          </h1>

          <ButtonLink
            href="mailto:ccv-support@brown.edu"
            external={true}
            variant="primary_outlined"
            className="hidden lg:w-fit lg:flex items-center justify-center w-full h-full text-lg
            font-semibold rounded-none
            border-red-university text-red-university
            hover:bg-red-university hover:text-white hover:border-red-university
            whitespace-nowrap px-2"
          >
            <FaComments className="mr-2 text-2xl" />
            Work with Us
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}

export default BrownBanner

import React from "react"
import { FaComments } from "react-icons/fa"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/ui/ButtonLink"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = () => {
  return (
    <header className="bg-white flex items-center py-2 px-4">
      <div className="flex flex-row items-center w-full">
        <div className="flex-shrink-0 pt-4 lg:pt-2 lg:border-r lg:border-neutral-900 pr-6">
          <ButtonLink
            href="https://it.brown.edu"
            external={true}
            className={"focus-visible:ring-0"}
          >
            <BrownLogo />
            <span className="sr-only">OIT Home</span>
          </ButtonLink>
        </div>
        
        <div className="flex-1 flex justify-start">
          <h1 className="pl-6 text-3xl font-semibold hidden lg:block">
            Center for Computation and Visualization
          </h1>
        </div>
        
        <div className="flex-shrink-0">
          <ButtonLink
            href="mailto:ccv-support@brown.edu"
            external={true}
            variant="primary_outlined"
            className="items-center justify-center text-lg
            font-semibold rounded-none py-6 px-4
            border-red-university text-red-university
            hover:bg-red-university hover:text-white hover:border-red-university
            whitespace-nowrap"
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

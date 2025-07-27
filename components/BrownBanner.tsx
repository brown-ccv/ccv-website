import React from "react"
import { Button } from "@/components/ui/button"
import { FaComments } from "react-icons/fa"
import Image from "next/image"
import OITLogo from "@/assets/oit-logo.png"
import ExternalLink from "@/components/ui/external-link"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = ({ id }) => {
  return (
    <header className="bg-white flex items-center py-2 px-6 sm:px-8">
      <div className="flex flex-row items-center w-full pl-8">
        <ExternalLink href="https://it.brown.edu" external={true}>
          <Image src={OITLogo} alt="OIT Logo" width={250} height={0} priority />
        </ExternalLink>
        <div className="ml-6 w-full flex flex-row justify-between items-center">
          <h1 className="py-10 pl-6 text-3xl font-semibold border-l border-black hidden lg:block">
            Center for Computation and Visualization
          </h1>
          <Button
            variant="primary_outlined"
            className="hidden lg:block
            font-semibold rounded-none text-xl
            border-red-university text-red-university  
            hover:bg-red-university hover:text-white hover:border-red-university
            whitespace-nowrap"
          >
            <ExternalLink
              href="mailto:ccv-support@brown.edu"
              external={true}
              className="flex items-center justify-center w-full h-full text-lg"
            >
              <FaComments className="mr-2 text-2xl" />
              Work with Us
            </ExternalLink>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default BrownBanner

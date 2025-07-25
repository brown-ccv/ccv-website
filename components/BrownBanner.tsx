import React from "react"
import { FaComments } from "react-icons/fa"
import Image from "next/image"
import OITLogo from "@/assets/oit-logo.png"
import ButtonLink from "@/components/ui/button-link"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = ({ id }) => {
  return (
    <header className="content-wrapper bg-white flex items-center py-2">
      <div className="flex flex-row items-center w-full">
        <ButtonLink
          href="https://it.brown.edu"
          external={true}
          className={"focus-visible:ring-0"}
        >
          <Image
            src={OITLogo}
            alt="OIT Home Page"
            width={250}
            height={0}
            priority
          />
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

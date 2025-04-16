import React from "react"
import { Button } from "@/components/ui/button"
import { MessagesSquareIcon } from "lucide-react"
import Image from "next/image"
import OITLogo from "@/assets/oit-logo.png"

export const BrownBanner: React.FC = () => {
  return (
    <header className="w-full h-[125px] bg-white relative mt-10 flex items-center px-6">
      <div className="flex flex-row items-center w-full">
        <a href="https://it.brown.edu">
          <Image src={OITLogo} alt="OIT Logo" width={200} height={0} priority />
        </a>
        <div className="ml-6 w-full flex flex-row justify-between items-center">
          <h1 className="py-7 pl-6 h-full sm:text-xl lg:text-2xl font-semibold border-l border-black md:block">
            Center for Computation and Visualization
          </h1>
          <Button
            variant="outline_primary"
            className="border-red-university text-red-university font-semibold rounded-none w-[159px] h-[50px] hover:bg-red-university hover:text-white hover:border-red-university"
          >
            <a
              href="mailto:ccv-support@brown.edu"
              className="flex items-center justify-center w-full h-full"
            >
              <MessagesSquareIcon className="mr-2 h-[26px] w-[26px]" />
              Work with Us
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default BrownBanner

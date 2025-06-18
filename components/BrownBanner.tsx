import React from "react"
import { Button } from "@/components/ui/button"
import { MessagesSquareIcon } from "lucide-react"
import Image from "next/image"
import OITLogo from "@/assets/oit-logo.png"
import CBCLogo from "@/components/assets/CBCLogo"

export const BrownBanner: React.FC = () => {
  return (
    <header className="content-wrapper bg-white relative flex items-center py-4">
      <div className="flex flex-row items-center w-full">
        <a href="https://it.brown.edu">
          <Image src={OITLogo} alt="OIT Logo" width={200} height={0} priority />
        </a>
        <div className="ml-6 w-full flex flex-row justify-between items-center">
          <div className="py-7 pl-6 h-full sm:text-xl lg:text-2xl font-semibold border-l border-black hidden lg:flex items-center lg:visible space-x-4">
            <CBCLogo width={60} />
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-semibold">
                Computational Biology Core
              </h1>
              <a
                href="https://sites.brown.edu/computational-biology-of-human-disease/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base lg:text-lg font-semibold hover:underline mt-1 ml-4"
              >
                COBRE-Center for Computational Biology of Human Disease
              </a>
            </div>
          </div>
          <Button
            variant="primary_outlined"
            className="absolute right-[49px] h-[50px] top-1/2 transform -translate-y-1/2 my-auto
            font-semibold rounded-none text-md
            border-red-university text-red-university  
            hover:bg-red-university hover:text-white hover:border-red-university
            whitespace-nowrap w-fit px-4 py-4"
          >
            <a
              href="mailto:cbc-help@brown.edu"
              className="flex items-center justify-center w-full h-full"
            >
              <MessagesSquareIcon className="mr-2" />
              Work with Us
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default BrownBanner

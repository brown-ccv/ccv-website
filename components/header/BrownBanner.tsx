import React from "react"
import { Button } from "@/components/ui/button"
import { MessagesSquareIcon } from "lucide-react"
import BrownLogo from "@/components/assets/BrownLogo"

export const BrownBanner: React.FC = () => {
  return (
    <header className="w-full h-[149px] bg-white relative mt-10 flex items-center px-6">
      <div className="flex items-center w-full">
        <BrownLogo className="w-[200px] h-auto" />
        <div className="ml-20 flex flex-col justify-center">
          <h1 className="font-semibold text-2xl">
            Center for Computation and Visualization
          </h1>
        </div>
      </div>

      <Button
        variant="outline_primary"
        className="absolute right-[49px] top-[50%] transform -translate-y-1/2 border-red-university text-red-university font-semibold rounded-none w-[159px] h-[50px] hover:bg-red-university hover:text-white hover:border-red-university"
      >
        <a 
          href="mailto:ccv-support@brown.edu" 
          className="flex items-center justify-center w-full h-full"
        >
          <MessagesSquareIcon className="mr-2 h-[26px] w-[26px]" />
          Work with Us
        </a>
      </Button>
    </header>
  )
}

export default BrownBanner
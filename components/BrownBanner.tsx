import React from "react"
import { FaHandshake } from "react-icons/fa"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/button/ButtonLink"
import { AnimatedGradientText } from "@/components/magicui/AnimatedGradientText"
import { cn } from "@/lib/utils"
import { ShineBorder } from "@/components/magicui/ShineBorder"

interface BrownBannerProps {
  id?: string
}

export const BrownBanner: React.FC<BrownBannerProps> = () => {
  return (
    <header className="flex flex-row items-center justify-between bg-white px-4 py-4">
      <a
        href="https://it.brown.edu"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 lg:border-r lg:border-slate-900 lg:p-2"
      >
        <BrownLogo width={150} className="sm:w-[200px]" />
        <span className="sr-only">OIT Home</span>
      </a>

      <h2 className="hidden pl-6 lg:flex lg:flex-1 lg:justify-start">
        Center for Computation and Visualization
      </h2>
      <ButtonLink
        href="/"
        variant="unstyled"
        className="relative overflow-hidden border border-purple-900 border-opacity-20 shadow-[inset_0_-8px_10px_#8fdfff1f] duration-500 ease-out hover:bg-neutral-100 hover:shadow-[inset_0_-5px_10px_#8fdfff3f] motion-safe:transition-shadow"
      >
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <AnimatedGradientText className="text-sm font-medium">
          Request an Oscar Account!
        </AnimatedGradientText>
      </ButtonLink>
    </header>
  )
}

export default BrownBanner

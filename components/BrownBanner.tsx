import React from "react"
import BrownLogo from "@/components/assets/BrownLogo"
import ButtonLink from "@/components/button/ButtonLink"

export function BrownBanner() {
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
        href="https://brown.co1.qualtrics.com/jfe/form/SV_0GtBE8kWJpmeG4B"
        external={true}
        variant="red_outlined"
      >
        Request an Oscar Account
      </ButtonLink>
    </header>
  )
}

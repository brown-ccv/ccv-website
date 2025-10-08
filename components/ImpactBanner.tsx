import React, { type JSX } from "react"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "650+", label: "Publication Contributions" },
    { count: "300+", label: "Yearly Office Hours Attendees" },
    { count: "2000+", label: "Yearly Oscar Users" },
  ]

  return (
    <div className="flex flex-grow flex-col items-center justify-between gap-12 bg-neutral-50 p-8 lg:flex-row lg:px-14 xl:px-20">
      <div className="text-center">
        <h2 className="font-sans font-semibold">The CCV Impact</h2>
      </div>

      {impactMetrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="bg-gradient-to-br from-purple-900 to-pink-500 bg-clip-text font-sans text-4xl font-bold text-transparent lg:text-5xl">
            {metric.count}
          </div>
          <div className="font-serif text-lg italic text-slate-700 lg:text-xl">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

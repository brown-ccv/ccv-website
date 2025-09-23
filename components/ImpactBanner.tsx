import React, { type JSX } from "react"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "650+", label: "Publication Contributions" },
    { count: "400+", label: "Questions Answered in Office Hours" },
    { count: "800+", label: "HPC Computing Hours" },
  ]

  return (
    <div className="flex flex-grow flex-col items-center justify-between gap-6 bg-neutral-50 p-8 lg:flex-row">
      <div className="text-center">
        <h2 className="font-sans font-semibold">The CCV Impact</h2>
        <p className="font-serif italic text-slate-600">
          As of January 1, 2025
        </p>
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

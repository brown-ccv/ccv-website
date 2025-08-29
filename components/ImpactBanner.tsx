import React, { type JSX } from "react"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "700+", label: "Publications" },
    { count: "2,000+", label: "HCP Users" },
    { count: "600+", label: "Collaborations" },
  ]

  return (
    <div className="flex flex-grow flex-col items-center justify-between gap-6 bg-neutral-50 p-16 lg:flex-row">
      <div className="text-center">
        <h2 className="font-sans text-[28px] font-semibold">The CCV Impact</h2>
        <p className="font-serif text-xl italic text-gray-600">
          As of January 1, 2025
        </p>
      </div>

      {impactMetrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="bg-gradient-to-br from-purple-900 to-pink-500 bg-clip-text font-sans text-6xl font-bold text-transparent">
            {metric.count}
          </div>
          <div className="font-serif text-[28px] italic text-black">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

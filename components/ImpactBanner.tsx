import React, { type JSX } from "react"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "700+", label: "Publications" },
    { count: "2,000+", label: "HCP Users" },
    { count: "600+", label: "Collaborations" },
  ]

  return (
    <div className="bg-neutral-50 p-16 flex flex-col lg:flex-row justify-between items-center flex-grow gap-6">
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-[28px] font-sans">The CCV Impact</h2>
        <p className="italic text-gray-600 text-xl font-serif">
          As of January 1, 2025
        </p>
      </div>

      {impactMetrics.map((metric, index) => (
        <div key={index}>
          <div
            className="bg-gradient-to-br from-purple-900 to-pink-500 bg-clip-text text-transparent
                    font-bold text-6xl text-center font-sans"
          >
            {metric.count}
          </div>
          <div className="italic text-black text-[28px] text-center font-serif">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

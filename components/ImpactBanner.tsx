import React from "react"
import { Card, CardContent } from "@/components/ui/card-impact"

export const ImpactBanner = (): JSX.Element => {
  // Data for impact metrics
  const impactMetrics = [
    { count: "700+", label: "Publications" },
    { count: "2,000+", label: "HCP Users" },
    { count: "600+", label: "Collaborations" },
  ]

  return (
    <Card className="w-full max-w-[1440px] h-[180px] bg-gray-100 rounded-none shadow-none">
      <CardContent className="flex items-center h-full p-6">
        <div className="flex-shrink-0 mr-32">
          <h2 className="font-sans font-semibold text-black text-[28px]">
            The CCV Impact
          </h2>
          <p className="font-serif font-normal italic text-gray-600 text-xl mt-2">
            As of January 1, 2025
          </p>
        </div>

        <div className="flex justify-between flex-grow">
          {impactMetrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-gradient-to-br from-purple-900 to-pink-500 bg-clip-text text-transparent font-sans
                 font-bold text-6xl text-center"
              >
                {metric.count}
              </div>
              <div className="font-serif italic text-black text-[28px] text-center">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

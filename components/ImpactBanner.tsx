import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "700+", label: "Publications" },
    { count: "2,000+", label: "HCP Users" },
    { count: "600+", label: "Collaborations" },
  ]

  return (
    <div className="w-full h-auto bg-gray-100">
      <Card className="w-full border-none shadow-none rounded-none bg-transparent">
        <CardContent className="max-w-[1440px] mx-auto max-h-[600px] flex items-center px-6 py-10">
           <div className="flex flex-wrap flex-col md:flex-row justify-between flex-grow">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-black text-[28px] font-sans">
                The CCV Impact
              </h2>
              <p className="italic text-gray-600 text-xl font-serif">
                As of January 1, 2025
              </p>    
            </div>

            {impactMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center mt-6 md:mt-0">
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
        </CardContent>
      </Card>
    </div>
  )
}

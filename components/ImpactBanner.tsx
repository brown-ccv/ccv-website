import React, { type JSX } from "react"

export const ImpactBanner = (): JSX.Element => {
  const impactMetrics = [
    { count: "650+", metric: "", label: "Publication Contributions" },
    { count: "300+", metric: "Yearly", label: "Yearly Office Hours Attendees" },
    { count: "1600+", metric: "", label: "Yearly Oscar Users" },
  ]

  return (
    <div className="flex flex-grow flex-col items-center justify-between gap-12 bg-neutral-50 p-8 lg:flex-row lg:px-14 xl:px-20">
      <div className="text-center">
        <h2 className="font-sans font-semibold">The CCV Impact</h2>
        {/*<p className="font-serif italic text-slate-600">*/}
        {/*  As of January 1, 2025*/}
        {/*</p>*/}
      </div>

      {impactMetrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="bg-gradient-to-br from-purple-900 to-pink-500 bg-clip-text font-sans text-4xl font-bold text-transparent lg:text-5xl">
            {metric.count}
            {/*{metric.metric && (*/}
            {/*  <span className="text-base font-normal italic text-black">*/}
            {/*    {metric.metric}*/}
            {/*  </span>*/}
            {/*)}*/}
          </div>
          {/*{metric.metric && (*/}
          {/*  <span className="text-base font-normal italic text-black">*/}
          {/*    {metric.metric}*/}
          {/*  </span>*/}
          {/*)}*/}
          <div className="font-serif text-lg italic text-slate-700 lg:text-xl">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

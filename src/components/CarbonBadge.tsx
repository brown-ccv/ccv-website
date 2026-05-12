import Script from "next/script"

export function CarbonBadge({ className = "" }: { className?: string }) {
  return (
    <>
      <div id="wcb" className={className + " carbonbadge wcb-d"}></div>
      <Script
        src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js"
        defer
      />
    </>
  )
}

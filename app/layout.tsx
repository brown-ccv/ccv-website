import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google"
import "@/app/globals.css"
import { ReactNode } from "react"
import BrownBanner from "@/components/BrownBanner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ConditionalStatusBanner from "@/components/ConditionalStatusBanner"
import { GoogleAnalytics } from "@next/third-parties/google"

// Only import server actions when not in static export mode
let getCachedOpenIssues: () => Promise<any[]>

if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
  const { getOpenIssues } = require("@/lib/get-open-issues")
  const { unstable_cache } = require("next/cache")
  getCachedOpenIssues = unstable_cache(getOpenIssues, ["open-issues"], {
    revalidate: 60,
  })
} else {
  getCachedOpenIssues = async () => []
}

const inter = Inter({ subsets: ["latin"] })
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata = {
  title: "Center for Computation & Visualization",
  description:
    "Advancing computational research with scientific and computing expertise at Brown University.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default async function RootLayoutWrapper({
  children,
}: {
  children: ReactNode
}) {
  // Fetch issues (function is already conditional based on static export)
  let issues = []
  try {
    issues = await getCachedOpenIssues()
  } catch (error) {
    console.error("Failed to fetch GitHub issues:", error)
  }

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </head>
      <body className={`${inter.className}`}>
        <ConditionalStatusBanner issues={issues} />
        <BrownBanner />
        <Navbar />
        <>{children}</>
        <GoogleAnalytics gaId="G-F94VC913EH" />
        <Footer />
      </body>
    </html>
  )
}

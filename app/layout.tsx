import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google"
import "@/app/globals.css"
import Footer from "@/components/Footer"
{/* remove */}
import BrownBanner from "@/components/header/BrownBanner"
import StatusBanner from "@/components/header/StatusBanner"
import Navbar from "@/components/header/Navbar"
import { Button } from "@/components/ui/button"
import getOpenIssues from "@/components/header/utils"
{/* remove */}

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
  title: "CCV",
  description: "Center for Computation & Visualization",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  {/* remove */}
    const repositories = await getOpenIssues()
    const issues = repositories.filter((repo) => repo.openIssues.length > 0)
    const repoNames = issues.map((repo) => repo.name).join(", ")
    {/* remove */}
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}
    >
      <head />
      <body className={`${inter.className} m-0 p-0 overflow-x-hidden bg-white`}>
        <div
          className="min-h-screen bg-white"
          style={{ zoom: 0.93 }}
        >
          <div className="flex flex-col justify-between min-h-screen">
            <div className="flex-grow">{children}</div>
            {/* remove */}
            <StatusBanner id="status-banner">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-base text-white">
              <strong>Service Disruption:</strong> {repoNames}
            </p>
            <Button 
              variant="secondary_filled" 
              size="sm"
            >
              <a 
                href="https://status.ccv.brown.edu/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Incidents
              </a>
            </Button>
          </div>
        </StatusBanner>
            < BrownBanner id="brown-banner" />
            < Navbar />
            {/* remove */}
            < Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

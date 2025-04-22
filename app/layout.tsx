import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google"
import "@/app/globals.css"
import Footer from "@/components/Footer"

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
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

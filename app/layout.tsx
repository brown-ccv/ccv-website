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
      <body className={`${inter.className} m-0 p-0`}>
        {/* 👇 Responsive scale on lg+ screens only */}
        <div className="w-screen overflow-x-hidden bg-white flex flex-col justify-between lg:scale-[0.75] lg:origin-top">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google"
import "@/app/globals.css"
import Navbar from "@/components/header/Navbar"
import Header from "@/components/header/Header"
import { HeroHome } from "@/components/HeroHome"
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
      <head></head>
      <body className={`${inter.className}`}>
        <div className="bg-white flex flex-col justify-between">
          <Header />
          <Navbar />
          <HeroHome />
          <div className="bg-white w-full flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

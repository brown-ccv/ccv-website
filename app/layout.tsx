import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"
import Header from "@/components/header/Header"
import Footer from "@/components/Footer"
import { Hero } from "@/components/header/Hero"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CCV",
  description: "Center for Computation & Visualization",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Hero
          title={"Center for Computation & Visualization"}
          description={
            "Scientific and technical computing expertise to advance computational research"
          }
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

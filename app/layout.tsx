import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

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
        <Navbar />
        {children}
      </body>
      <Footer />
    </html>
  )
}

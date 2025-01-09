import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"
import { getRoutes } from "@/lib/markdown"
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
  route,
}: Readonly<{
  children: React.ReactNode
}>) {
  const routes = getRoutes(route)
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Hero routes={routes} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

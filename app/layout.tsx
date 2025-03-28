"use client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import React from "react"
// import Header from "@/components/header/Header"
// import Footer from "@/components/Footer"

import React, { useRef } from "react";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/Hero";
import { MissionCards } from "@/components/MissionCards";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer2";
// import { Navbar } from "@/components/header/NavbarAnima";

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "CCV",
//   description: "Center for Computation & Visualization",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const featuredProjectsRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedProjects = () => {
    featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="bg-white flex flex-row justify-center w-full">
          <div className="bg-white w-full max-w-[1440px] relative">
            {/* <Header /> */}
            <div className="relative">
              <Hero onViewEventsClick={scrollToFeaturedProjects} />
              <MissionCards />
            </div>
            <div ref={featuredProjectsRef} className="mt-20">
              <FeaturedProjects />
            </div>
            {/* <Events /> */}
            <Footer />
          </div>
        </div>
      </body>
      <main>{children}</main>
    </html>
  )
}

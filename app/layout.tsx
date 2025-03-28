import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import React from "react"
// import Header from "@/components/header/Header"
// import Footer from "@/components/Footer"

import React, { useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MissionCards } from "@/components/MissionCards";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
// import { StatusBanner } from "../../components/StatusBanner";
// import { Navbar } from "../../components/Navbar";
// import { Events } from "../../components/Events";

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

  const featuredProjectsRef = useRef<HTMLDivElement>(null);

  const scrollToFeaturedProjects = () => {
    featuredProjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />

        <div className="bg-white flex flex-row justify-center w-full">
          <div className="bg-white w-full max-w-[1440px] relative">
            {/* <StatusBanner /> */}
            <Header />
            {/* <Navbar /> */}
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
    </html>
  )
}

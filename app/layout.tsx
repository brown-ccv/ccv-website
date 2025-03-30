import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header/Header"
import { Footer } from "@/components/Footer"
import ClientLayout from "@/app/ClientLayout"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white flex flex-row justify-center w-full">
          <div className="bg-white w-full max-w-[1440px] relative">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
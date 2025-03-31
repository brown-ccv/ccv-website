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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <div className="bg-white flex flex-col justify-between min-h-screen w-full">
          <div className="bg-white w-full flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

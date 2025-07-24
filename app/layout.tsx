import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import BrownBanner from "@/components/BrownBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "Center for Computation & Visualization",
  description: "Advancing computational research with scientific and computing expertise at Brown University.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} m-0 p-0 overflow-x-hidden bg-white`}
      >
        <div>
          <BrownBanner />
          <Navbar />
          <div className="flex-grow w-full">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
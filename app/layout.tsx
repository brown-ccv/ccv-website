import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import { getOpenIssues } from "@/lib/getOpenIssues";
import { unstable_cache } from "next/cache";
import LayoutWithStatusBanner from "@/components/LayoutWithStatusBanner";
import BrownBanner from "@/components/BrownBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const getCachedOpenIssues = unstable_cache(
  getOpenIssues,
  ["open-issues"],
  { revalidate: 60 }
);

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
  title: "CCV",
  description: "Center for Computation & Visualization",
};

export default async function RootLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const issues = await getCachedOpenIssues();

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}
    >
      <head />
      <body
        className={`${inter.className} m-0 p-0 overflow-x-hidden bg-white`}
      >
        <div className="relative">
        {/* CSS - with position: sticky on the Navbar, it will initially flow normally. When the user scrolls to the point where the Navbar would move out of the viewport of its containing block (<div className="relative"> in this case), it will become fixed to the top: 0 of that containing block. */}
          <LayoutWithStatusBanner issues={issues} />
          <BrownBanner />
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
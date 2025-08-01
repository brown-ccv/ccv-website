import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { ReactNode } from "react";
import BrownBanner from "@/components/BrownBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConditionalStatusBanner from "@/components/ConditionalStatusBanner";

// Only import server actions when not in static export mode
let getCachedOpenIssues: () => Promise<any[]>;

if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
  const { getOpenIssues } = require("@/lib/get-open-issues");
  const { unstable_cache } = require("next/cache");
  getCachedOpenIssues = unstable_cache(
    getOpenIssues,
    ["open-issues"],
    { revalidate: 60 }
  );
} else {
  getCachedOpenIssues = async () => [];
}

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
  // Fetch issues (function is already conditional based on static export)
  let issues = [];
  try {
    issues = await getCachedOpenIssues();
  } catch (error) {
    console.error('Failed to fetch GitHub issues:', error);
  }

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
          <ConditionalStatusBanner issues={issues} />
          <BrownBanner />
          <Navbar />
          <div className="flex-grow w-full">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
import { Inter, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import LayoutWithStatusBanner from "@/components/LayoutWithStatusBanner";
import { ReactNode } from "react";
import { getOpenIssues } from "@/lib/getOpenIssues";
import { unstable_cache } from "next/cache";

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
  const issues = await getCachedOpenIssues()

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}
    >
      <head />
      <body
        className={`${inter.className} m-0 p-0 overflow-x-hidden bg-white`}
      >
        <LayoutWithStatusBanner issues={issues}>
          {children}
        </LayoutWithStatusBanner>
      </body>
    </html>
  );
}

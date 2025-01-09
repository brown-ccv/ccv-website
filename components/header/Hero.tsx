"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getRoute, RouteData } from "@/lib/markdown"

interface HeroProps {
  routes: RouteData[]
}

export const Hero = ({ routes }: HeroProps) => {
  let bgImage = "bg-[url('/bharath-g-s-aLGiPJ4XRO4-unsplash.13d1087.jpg')]"
  let heroPadding = "py-32"
  const pathname = usePathname()
  if (pathname === "/") {
    bgImage = "bg-[url('/ccv-winter.jpg')]"
    heroPadding = "py-32 sm:py-48 lg:py-64"
  }
  const route = routes.find((route) => route.slug === pathname.replace("/", ""))
  return (
    <div className={`${bgImage} bg-bottom bg-cover bg-fixed`}>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className={`${heroPadding} mx-auto w-2/3`}>
          <div className="py-4 text-center bg-black bg-opacity-45 text-white">
            {route && (
              <>
                <h1 className="text-balance text-5xl font-semibold sm:text-7xl">
                  {route.title}
                </h1>
                <p className="mt-8 text-pretty text-xl font-medium sm:text-xl/8 lg:text-3xl">
                  {route.description}
                </p>
              </>
            )}
            {!route && (
              <>
                <h1 className="text-balance text-5xl font-semibold sm:text-7xl">
                  Center for Computation & Visualization
                </h1>
                <p className="mt-8 text-pretty text-xl font-medium sm:text-xl/8 lg:text-3xl">
                  Scientific and technical computing expertise to advance
                  computational research
                </p>
              </>
            )}
            {pathname === "/" && (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#events"
                  className="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Events
                </Link>
                <Link href="/services" className="text-sm/6 font-semibold">
                  Learn more about our services{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import BrownLogo from "@/components/assets/BrownLogo"
import CCVLogo from "@/components/assets/CCVLogo"
import { navigation } from "@/components/NavItems"

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="w-full bg-neutral-50">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-8 sm:pt-24 lg:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8">
            <div className="flex w-2/3 gap-3.5">
              <BrownLogo />
              <CCVLogo />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 xl:col-span-2">
            {navigation.map((contents) => {
              return (
                <div key={contents.href}>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {contents.title}
                  </p>
                  <ul role="list" className="mt-6 space-y-2">
                    <li>
                      <Link
                        href={contents.href}
                        className="text-sm leading-6 text-700 hover:text-black hover:border-b-2"
                      >
                        Explore {contents.title}
                      </Link>
                    </li>
                    {contents.routes.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-700 hover:text-black hover:border-b-2"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-16">
        <p className="mb-8 text-xs text-center leading-5 text-gray-500">
          &copy; 2024 Center for Computation and Visualization, Brown University
          | 180 George St, Providence RI 02906
        </p>
      </div>
    </footer>
  )
}

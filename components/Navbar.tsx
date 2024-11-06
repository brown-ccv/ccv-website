import LogoCcv from "@/components/assets/LogoCcv"
import LogoBrown from "@/components/assets/LogoBrown"
import NavLinks from "@/components/NavLinks"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/20/solid"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-neutral-50 shadow">
      <div className="mx-auto max-w-7xl p-2 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-3.5 xl:flex-row xl:h-16 xl:justify-between">
          <div className="flex justify-between px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center gap-3">
              <a href="https://it.brown.edu/" target="_blank">
                <span className="sr-only">Brown IT Website</span>
                <LogoBrown width={115} />
              </a>
              <Link href="/">
                <span className="sr-only">Home</span>
                <LogoCcv width={95} />
              </Link>
            </div>
            <div className="hidden xl:ml-6 xl:flex xl:items-center xl:space-x-8">
              <NavLinks />
            </div>
            <div className="flex items-center xl:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center px-2 gap-10 xl:ml-6">
            <div>
              <a
                href="https://docs.ccv.brown.edu"
                target="_blank"
                aria-label="CCV Services' Documentation"
                className="bg-white text-secondary-blue-700 inline-flex items-center rounded-md px-3 py-2 "
              >
                Docs
                <DocumentTextIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-secondary-blue-700"
                />
              </a>
            </div>

            <div className="w-full max-w-lg xl:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-neutral-300"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xl:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <NavLinks linkType="mobile" />
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
export default Navbar

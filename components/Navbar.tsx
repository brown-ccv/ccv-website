"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import CCVLogo from "@/components/assets/CCVLogo"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import {
  FiHelpCircle,
  FiFileText,
  FiMenu,
  FiChevronDown as FiChevronDownIcon,
} from "react-icons/fi"

import {
  FaChevronDown,
  FaSearch,
  FaUser,
  FaUserCheck,
  FaUserPlus,
  FaUserGraduate,
  FaComments,
  FaDollarSign,
  FaCloud,
  FaWindowRestore,
  FaFileImport,
  FaDesktop,
} from "react-icons/fa"

interface RouteItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface NavigationProps {
  groups: {
    name: string
    routes: RouteItem[]
  }[]
  parentTitle: string
}

type Route = {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type RouteGroup = {
  name: string
  routes: Route[]
}

type NavSection = {
  name: string
  groups: RouteGroup[]
}

const routes: NavSection[] = [
  {
    name: "Services",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "Data Analysis",
            href: "/services/analysis",
            description: "",
          },
          {
            name: "Consulting",
            href: "/services/consulting",
            description: "",
          },
          {
            name: "DevOps",
            href: "/services/devops",
            description: "",
          },
        ],
      },
    ],
  },
  {
    name: "Portfolio",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "Collaborations",
            href: "/portfolio/collaborations",
            description: "",
          },
          {
            name: "Software",
            href: "/portfolio/software",
            description: "",
          },
          {
            name: "Workshops and Talks",
            href: "/portfolio/workshops-and-talks",
            description: "",
          },
          {
            name: "Publications",
            href: "https://publications.ccv.brown.edu",
            description: "",
          },
        ],
      },
    ],
  },
  {
    name: "About",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "About Us",
            href: "/about/about-us",
            description: "",
          },
          {
            name: "Careers",
            href: "/about/careers",
            description: "",
          },
        ],
      },
    ],
  },
  {
    name: "Resources",
    groups: [
      {
        name: "",
        routes: [
          {
            name: "Office Hours",
            href: "/officehours",
            description: "",
          },
          {
            name: "IPA Scheduler",
            href: "/ipa",
            description: "",
          },
        ],
      },
    ],
  },
]

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]) // Array to track open submenus

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleSubmenu = (sectionName: string) => {
    if (openSubmenus.includes(sectionName)) {
      setOpenSubmenus(openSubmenus.filter((name) => name !== sectionName))
    } else {
      setOpenSubmenus([...openSubmenus, sectionName])
    }
  }

  return (
    <header className={`sticky top-0 z-50`}>
      <nav className="bg-blue-navbar flex px-8 justify-between">
        {/* CCV Logo */}
        <div className="flex items-center py-8 px-6 xl:px-10">
          <Link href={"/"}>
            <CCVLogo width={120} />
          </Link>
        </div>

        {/* Navigation Menu for Desktop */}
        <NavigationMenu.Root className="hidden lg:flex relative z-10 w-screen justify-between items-stretch">
          <NavigationMenu.List className="m-0 flex list-none rounded-md h-full items-center">
            {routes.map((section) => (
              <NavigationMenu.Item key={section.name}>
                <NavigationMenu.Trigger className="group inline-flex h-9 items-center justify-center gap-2 px-3 xl:px-6 text-white text-2xl font-semibold transition-colors hover:text-sunglow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  {section.name}
                  <FaChevronDown
                    className="relative top-[1px] ml-0 xl:ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationSectionContent
                  groups={section.groups}
                  parentTitle={section.name}
                />
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>

          <NavigationMenu.List className="m-0 flex list-none rounded-md h-full items-center">
            {/* Search */}
            <NavigationMenu.Item>
              <Button
                variant="secondary_filled"
                className="flex items-center justify-center ml-6"
                iconOnly={<FaSearch />}
                size="icon"
              >
                <FaSearch />
              </Button>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Mobile Menu Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <Button
            variant="secondary_filled"
            size="icon"
            className="text-blue-navbar rounded-none"
            onClick={toggleMobileMenu}
          >
            <FiMenu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-neutral-900 shadow-md z-40 p-4 overflow-y-auto max-h-screen">
            {routes.map((section) => (
              <div key={section.name} className="mb-4 outline-double">
                {section.name === "Blog" ? (
                  <Link
                    href="/blog"
                    className="block text-white font-semibold text-2xl py-2 tracking-widest"
                  >
                    {section.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSubmenu(section.name)}
                      className="flex items-center justify-between w-full font-semibold text-sunglow-400 tracking-widest text-2xl py-6 px-6"
                    >
                      {section.name}
                      <FiChevronDownIcon
                        className={`h-4 w-4 transition-transform ${openSubmenus.includes(section.name) ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openSubmenus.includes(section.name) && (
                      <div className="ml-6">
                        {section.groups.map((group) => (
                          <div className="py-2" key={group.name}>
                            {group.routes.map((route) => (
                              <Link
                                key={route.href}
                                href={route.href}
                                className="block text-white text-xl py-6 pl-6 mr-6 hover:bg-sunglow-400 hover:text-black active:bg-sunglow-200"
                              >
                                {route.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Link
                href="/help"
                className="block text-sunglow-400 font-semibold text-2xl tracking-widest py-6 pl-6 mr-6 hover:bg-sunglow-400 hover:text-black active:bg-sunglow-200"
              >
                Help
              </Link>
              <a
                href="https://docs.ccv.brown.edu/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sunglow-400 font-semibold text-2xl tracking-widest py-6 pl-6 mr-6 hover:bg-sunglow-400 hover:text-black active:bg-sunglow-200"
              >
                Docs
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const NavigationSectionContent: React.FC<{
  groups: RouteGroup[]
  parentTitle: string
}> = ({ groups }) => {
  const hasMultipleGroups = groups.length > 1

  return (
    <NavigationMenu.Content className="absolute top-full z-50 w-max rounded-md shadow-md bg-white hidden lg:block">
      <div
        className={`p-2 sm:p-4 md:p-6 flex flex-col xl:flex-row ${hasMultipleGroups ? "space-x-8" : ""}`}
      >
        {groups.map((group, index) => (
          <div
            key={group.name}
            className={`${hasMultipleGroups && index > 0 ? "border-t border-l-0 xl:border-l xl:border-t-0 border-neutral-700 py-1 xl:py-0 xl:pl-6" : ""} ${hasMultipleGroups && index < 1 ? "py-1 px-6 xl:py-0 xl:px-0" : ""} ${hasMultipleGroups ? "flex-1" : ""}`}
          >
            {group.name && (
              <h3 className="text-xl mb-2 sm:mb-3 md:mb-4 pl-2 tracking-widest max-w-[425px]">
                {group.name.toUpperCase()}
              </h3>
            )}
            <ul className="list-none flex flex-col gap-1 sm:gap-1.5 md:gap-2">
              {group.routes.map((route) => (
                <li
                  key={route.href}
                  className="hover:bg-neutral-50 focus:bg-neutral-100 p-1 sm:p-1.5 md:p-2"
                >
                  <NavigationMenu.Link
                    href={route.href}
                    className="flex items-start focus:outline-none"
                  >
                    {route.icon && (
                      <div className="mr-1 sm:mr-1.5 md:mr-2 h-[2rem] sm:h-[3rem] md:h-[4rem] w-[2rem] sm:w-[3rem] md:w-[4rem] bg-neutral-100/75 text-white rounded-md flex items-center justify-center">
                        <route.icon className="h-1/2 w-1/2" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl font-semibold pb-0.5 sm:pb-0.75 md:pb-1">
                        {route.name}
                      </span>
                      {route.description && (
                        <span className="max-w-[425px] text-sm sm:text-md text-neutral-500 italic mb-1 sm:mb-1.5 md:mb-3">
                          {route.description}
                        </span>
                      )}
                    </div>
                  </NavigationMenu.Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </NavigationMenu.Content>
  )
}

export default Navbar
export { routes }
export type { RouteItem, NavigationProps, Route, RouteGroup, NavSection }

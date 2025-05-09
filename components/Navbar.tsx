"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import CCVLogo from "@/components/assets/CCVLogo"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { FiHelpCircle, FiFileText, FiMenu } from "react-icons/fi"

import {
  FaChevronDown,
  FaSearch,
  FaComments,
  FaUserCheck,
  FaUserGraduate,
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
    name: string;
    routes: RouteItem[];
  }[];
  parentTitle: string;
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
        name: "Research Support & Consulting",
        routes: [
          {
            name: "Project Consulting",
            href: "/services/consulting",
            description:
              "We help with: Computational Biology, AI / Machine Learning, Software Engineering, Scientific Visualization, and more",
            icon: FaComments,
          },
          {
            name: "User Support",
            href: "/services/user-support",
            description: "We help with compute infrastructure",
            icon: FaUserCheck,
          },
          {
            name: "Classroom Support",
            href: "/services/classroom-support",
            description:
              "We provide technology and training for teaching with code",
            icon: FaUserGraduate,
          },
          {
            name: "Service Rates",
            href: "/services/rates",
            description: "Learn about the cost of our services",
            icon: FaDollarSign,
          },
        ],
      },
      {
        name: "Compute Infrastructure",
        routes: [
          {
            name: "Oscar",
            href: "/services/oscar",
            description: "Brown’s high-performance computing cluster",
            icon: FaCloud,
          },
          {
            name: "Stronghold",
            href: "/services/stronghold",
            description:
              "Brown’s highly secure computing & storage environment",
            icon: FaWindowRestore,
          },
          {
            name: "Campus File Storage and Transfer",
            href: "/services/file-storeage",
            description: "Brown’s storage options",
            icon: FaFileImport,
          },
          {
            name: "Virtual Machine Hosting",
            href: "/services/virtual-machine-hosting",
            description: "Brown-hosted Windows and Linux servers",
            icon: FaDesktop,
          },
          {
            name: "Hardware Rates",
            href: "/services/hardware-rates",
            description: "Learn about the cost of our hardware services",
            icon: FaDollarSign,
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
            description:"",
          },
          {
            name: "Contact Us",
            href: "/about/contact",
            description:"",
          },
          {
            name: "Careers",
            href: "/about/careers",
            description:"",
          },
        ],
      },
    ],
  }
]

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`sticky top-0 z-50`}>
      <nav className="bg-blue-navbar flex px-8">
        {/* Mobile Menu Button */}
        {/* <div className="lg:hidden">
          <Button variant="secondary_filled" size="icon" className="text-blue-navbar rounded-none" onClick={toggleMobileMenu}>
            <FiMenu className="h-6 w-6" />
          </Button>
        </div> */}

        {/* CCV Logo */}
        <div className="flex items-center py-4 lg:py-8">
          <Link href={"/"}>
            <CCVLogo width={120}/>
          </Link>
        </div>

        {/* Navigation Menu for Desktop */}
        <NavigationMenu.Root className="hidden lg:flex relative z-10 w-screen justify-between items-center">
          <NavigationMenu.List className="m-0 flex list-none rounded-md items-center">
            {routes.map((section) =>
              <NavigationMenu.Item key={section.name}>
                <NavigationMenu.Trigger className="group inline-flex h-9 items-center justify-center gap-2 px-4 text-white text-2xl transition-colors hover:text-sunglow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  {section.name}
                  <FaChevronDown
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                <NavigationSectionContent
                  groups={section.groups}
                  parentTitle={section.name}
                />
              </NavigationMenu.Item>
            )}

            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="inline-flex h-9 items-center justify-center gap-2 px-4 text-white text-2xl transition-colors hover:text-sunglow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50" 
                href="/blog">
                Blog
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.List className="m-0 flex list-none rounded-md items-center">
            {/* Help */}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="inline-flex h-9 items-center justify-center gap-2 px-4 text-white text-2xl transition-colors hover:text-sunglow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50" 
                href="/help">
                <FiHelpCircle className="text-3xl mr-3"/>Help
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            {/* Documentation */}
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="inline-flex h-9 items-center justify-center gap-2 px-4 text-white text-2xl transition-colors hover:text-sunglow-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50" 
                href="https://docs.ccv.brown.edu/documentation">
                <FiFileText size="" className="text-3xl mr-3" />Docs
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            {/* Search */}
            <NavigationMenu.Item>
              <Button
                variant="secondary_filled"
                className="flex items-center justify-center"
                iconOnly={<FaSearch />}
                size="icon"
              >
                <FaSearch />
              </Button>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-sunglow-400 shadow-md z-40 p-4">
            {routes.map((section) => (
              <div key={section.name} className="mb-4">
                {section.name === "Blog" ? (
                  <Link href="/blog" className="block text-blue-navbar font-semibold text-xl py-2 tracking-widest">
                    {section.name.toUpperCase()}
                  </Link>
                ) : (
                  <>
                    <button onClick={() => { /* Implement toggle for submenu if needed */ }} className="flex items-center justify-between w-full font-semibold text-blue-navbar  tracking-widest text-xl py-2">
                      {section.name.toUpperCase()}
                      <FaChevronDown className="h-4 w-4" />
                    </button>
                    <div className="ml-4">
                      {section.groups.map(group => (
                        <div key={group.name}>
                          {group.routes.map(route => (
                            <Link key={route.href} href={route.href} className="block text-blue-navbar text-lg py-1">
                              {route.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Link href="/help" className="block text-blue-navbar font-semibold text-xl py-2 tracking-widest">
                HELP
              </Link>
              <a href="https://docs.ccv.brown.edu/documentation" target="_blank" rel="noopener noreferrer" className="block text-blue-navbar font-semibold text-xl py-2 tracking-widest">
                DOCS
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

const NavigationSectionContent: React.FC<{
  groups: RouteGroup[];
  parentTitle: string;
}> = ({ groups }) => {
  const hasMultipleGroups = groups.length > 1;

  return (
    <NavigationMenu.Content className="absolute top-full z-50 w-max rounded-md shadow-md bg-white lg:block hidden"> {/* Hide on mobile by default */}
      <div className={`p-10 flex ${hasMultipleGroups ? 'space-x-8' : ''} ${hasMultipleGroups ? 'flex-grow' : ''}`}>
        {groups.map((group, index) => (
          <div
            key={group.name}
            className={`${hasMultipleGroups && index > 0 ? 'border-l border-black pl-10' : ''} ${hasMultipleGroups ? 'flex-1' : ''}`}
          >
            {group.name && <h3 className="text-2xl mb-6 tracking-widest">{group.name.toUpperCase()}</h3>}
            <ul className="list-none flex flex-col gap-2">
              {group.routes.map((route) => (
                <li key={route.href} className="hover:bg-white hover:text-black pb-4">
                  <NavigationMenu.Link
                    href={route.href}
                    className="flex items-start focus:outline-none focus:text-black"
                  >
                    {route.icon && (
                      <div className="mr-4 h-[4rem] w-[4rem] bg-neutral-100/75 border text-white rounded-md flex items-center justify-center">
                        <route.icon className="h-1/2 w-1/2"/>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-2xl font-semibold pb-1">{route.name}</span>
                      {route.description && (
                        <span className="max-w-[550px] text-lg text-neutral-500 italic mb-3">{route.description}</span>
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
  );
};

export default Navbar
export { routes }
export type { RouteItem, NavigationProps, Route, RouteGroup, NavSection }
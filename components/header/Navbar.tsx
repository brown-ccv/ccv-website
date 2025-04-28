"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import CCVLogo from "@/components/assets/CCVLogo"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { FiHelpCircle, FiFileText } from "react-icons/fi"
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
  routes: RouteItem[]
  parentTitle: string
  parentHref: string
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
            href: "/services/usersupport",
            description: "We help with compute infrastructure",
            icon: FaUserCheck,
          },
          {
            name: "Classroom Support",
            href: "/services/classroomsupport",
            description:
              "We provide technology and training for teaching with code",
            icon: FaUserGraduate,
          },
          {
            name: "Service Rates",
            href: "/services/servicerates",
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
            href: "/services/filestoreage",
            description: "Brown’s storage options",
            icon: FaFileImport,
          },
          {
            name: "Virtual Machine Hosting",
            href: "/services/vm",
            description: "Brown-hosted Windows and Linux servers",
            icon: FaDesktop,
          },
          {
            name: "Hardware Rates",
            href: "/services/hardwarerates",
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
        name: "Our Work",
        routes: [
          {
            name: "Portfolio",
            href: "/portfolio",
            description: "",
          },
          {
            name: "Collaborations",
            href: "#",
            description: "",
          },
          {
            name: "Software",
            href: "/our-work/software",
            description: "",
          },
          {
            name: "Workshops and Talks",
            href: "/our-work/workshops-and-talks",
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
        name: "About CCV",
        routes: [
          {
            name: "Mission",
            href: "/about#mission",
          },
          {
            name: "Office of Information Technology",
            href: "/about#office-of-information-technology",
          },
          {
            name: "Our Teams",
            href: "/about#our-teams",
          },
          {
            name: "People",
            href: "/about#people",
          },
          {
            name: "Opportunities",
            href: "/about#opportunities",
          },
          {
            name: "Events",
            href: "https://events.brown.edu/ccv/month",
          },
          {
            name: "Facilities Statement",
            href: "/about#facilities-statement",
          },
          {
            name: "Diversity Statement",
            href: "/about#diversity-statement",
          },
        ],
      },
    ],
  },
]

const navItems = [
  {
    name: "Services",
    href: "/services",
    routes: [
      { name: "Classroom", href: "/services/classroom" },
      { name: "Computing", href: "/services/computing" },
      {
        name: "Campus File Storage and Transfer",
        href: "/services/file-storage-and-transfer",
      },
      { name: "Rates", href: "/services/rates" },
      { name: "Visualization Systems", href: "/services/visualization" },
      { name: "Consulting", href: "/services/consulting" },
    ],
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    routes: [
      { name: "Collaborations", href: "#" },
      {
        name: "Software",
        href: "/our-work/software",
      },
      {
        name: "Workshops and Talks",
        href: "/our-work/workshops-and-talks",
      },
      {
        name: "Publications",
        href: "https://publications.ccv.brown.edu",
      },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    routes: [],
  },
  {
    name: "About",
    href: "/about",
    routes: [
      { name: "Mission", href: "/about#mission" },
      {
        name: "Office of Information Technology",
        href: "/about#office-of-information-technology",
      },
      {
        name: "Our Teams",
        href: "/about#our-teams",
      },
      {
        name: "People",
        href: "/about#people",
      },
      {
        name: "Opportunities",
        href: "/about#opportunities",
      },
      {
        name: "Events",
        href: "https://events.brown.edu/ccv/month",
      },
      {
        name: "Facilities Statement",
        href: "/about#facilities-statement",
      },
      {
        name: "Diversity Statement",
        href: "/about#diversity-statement",
      },
    ],
  },
]

export const Navbar: React.FC = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded)
  }

  return (
    <nav className="content-wrapper h-[131px] bg-blue-navbar">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link href={"/"}>
              <CCVLogo width={105} />
            </Link>
          </div>

          {/* Navigation Menu for Desktop */}
          <NavigationMenu.Root className="hidden lg:block">
            <NavigationMenu.List className="flex list-none space-x-5">
              {navItems.map((item) => {
                return (
                  <NavigationMenu.Item key={item.href}>
                    <NavigationMenu.Trigger className="group inline-flex h-9 items-center justify-center gap-2 px-4 py-2 text-white text-xl transition-colors hover:text-white focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/50 data-[state=open]:bg-white/50">
                      {item.name}
                      <FaChevronDown
                        className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                        aria-hidden="true"
                      />
                    </NavigationMenu.Trigger>
                    {item.routes && (
                      <NavigationLinks
                        routes={item.routes}
                        parentHref={item.href}
                        parentTitle={item.name}
                      />
                    )}
                  </NavigationMenu.Item>
                )
              })}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div className="flex items-center space-x-8">
          {/* Help and Docs links */}
          <div className="flex items-center text-white">
            <FiHelpCircle className="text-3xl mr-3" />
            <span className="text-xl">Help</span>
          </div>

          <div className="flex items-center text-white">
            <FiFileText size="" className="text-3xl mr-3" />
            <span className="text-xl">Docs</span>
          </div>

          {/* SearchIcon button and input */}
          <div className="relative">
            {isSearchExpanded ? (
              <div className="flex items-center">
                <Button
                  variant="secondary_filled"
                  className="flex items-center justify-center"
                  iconOnly={<FaSearch />}
                  size="icon"
                  onClick={handleSearchToggle}
                >
                  <FaSearch />
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary_filled"
                className="flex items-center justify-center"
                iconOnly={<FaSearch />}
                size="icon"
                onClick={handleSearchToggle}
              ></Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavigationLinks: React.FC<NavigationProps> = ({
  routes,
  parentTitle,
  parentHref,
}) => {
  return (
    <NavigationMenu.Content className="absolute top-[100%] z-50 w-max rounded-md shadow-md">
      <ul className="list-none p-4 m-0 bg-neutral-50 flex flex-col gap-2">
        <li className="p-2 hover:bg-white hover:text-black">
          <NavigationMenu.Link
            href={parentHref}
            className="p-2 focus:outline-none focus:text-black"
          >
            Explore {parentTitle}
          </NavigationMenu.Link>
        </li>
        {routes.length > 0 &&
          routes.map((route) => (
            <li key={route.href} className="p-2  hover:text-black">
              <NavigationMenu.Link
                href={route.href}
                className="p-2 focus:outline-none focus:text-black"
              >
                {route.name}
              </NavigationMenu.Link>
            </li>
          ))}
      </ul>
    </NavigationMenu.Content>
  )
}

export default Navbar
export { navItems, NavigationLinks }
export type { RouteItem, NavigationProps }

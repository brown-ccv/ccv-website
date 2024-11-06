"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "@headlessui/react"
import React from "react"

interface NavLinksProps {
  linkType?: string
}

export const navigation = [
  {
    title: "Services",
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
    title: "Our Work",
    href: "/our-work",
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
    title: "Help",
    href: "/help",
    routes: [
      { name: "Submit a Ticket", href: "mailto:support@ccv.brown.edu" },
      {
        name: "Discourse",
        href: "https://ask.cyberinfrastructure.org/c/brown-research-computing/37",
      },
      {
        name: "Slack",
        href: "https://ccv-share.slack.com/signup#/",
      },
      {
        name: "Office Hours",
        href: "https://events.brown.edu/ccv/month",
      },
    ],
  },
  {
    title: "About",
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
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "https://docs.ccv.brown.edu/documentation",
    routes: [
      { name: "Oscar", href: "https://docs.ccv.brown.edu" },
      {
        name: "Stronghold",
        href: "/services/computing#data-risk-level-3-computing-(stronghold)",
      },
      { name: "Globus", href: "/services/file-storage-and-transfer#globus" },
      { name: "Jupyter Hub", href: "/services/classroom#jupyterhub" },
    ],
  },
]

const NavLinks: React.FC<NavLinksProps> = ({ linkType }) => {
  const pathname = usePathname()
  if (linkType === "mobile") {
    return (
      <>
        {navigation.map((path) => {
          return (
            <Menu
              key={path.href}
              as="a"
              href={path.href}
              className={`block border-l-4 text-lg font-medium py-2 pl-3 pr-4 hover:border-gray-300 hover:text-secondary-blue-500 ${pathname === path.slug ? "active text-secondary-blue-500 border-secondary-blue-500" : "border-transparent text-neutral-700"}`}
            >
              {path.title}
            </Menu>
          )
        })}
      </>
    )
  }
  return (
    <>
      {navigation.map((path) => {
        return (
          <Menu key={path.href}>
            <div className="hidden lg:ml-6 group lg:flex">
              <Link
                className={`inline-flex text-lg items-center border-b-2 px-1 pt-1 font-medium hover:border-gray-300 hover:text-secondary-blue-500 ${pathname === path.href ? "active text-secondary-blue-500 border-b-2 border-secondary-blue-500" : "border-transparent text-neutral-700"}`}
                href={path.href}
              >
                {path.title}
              </Link>
            </div>
          </Menu>
        )
      })}
    </>
  )
}
export default NavLinks

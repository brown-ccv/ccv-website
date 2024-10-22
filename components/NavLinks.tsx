"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DisclosureButton } from "@headlessui/react"
import React from "react"

interface NavLinksProps {
  linkType?: string
}

const NavLinks: React.FC<NavLinksProps> = ({ linkType }) => {
  const paths = [
    { slug: "/services", title: "Services" },
    { slug: "/our-work", title: "Our Work" },
    { slug: "/help", title: "Help" },
    { slug: "/about", title: "About" },
    { slug: "/blog", title: "Blog" },
  ]
  const pathname = usePathname()
  if (linkType === "mobile") {
    //block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800
    return (
      <>
        {paths.map((path) => {
          return (
            <DisclosureButton
              key={path.slug}
              as="a"
              href={path.slug}
              className={`block border-l-4 font-medium py-2 pl-3 pr-4 hover:border-gray-300 hover:text-secondary-blue-500 ${pathname === path.slug ? "active text-secondary-blue-500 border-secondary-blue-500" : "border-transparent text-neutral-700"}`}
            >
              {path.title}
            </DisclosureButton>
          )
        })}
      </>
    )
  }
  return (
    <>
      {paths.map((path) => {
        return (
          <Link
            key={path.slug}
            className={`inline-flex items-center border-b-2 px-1 pt-1 font-medium hover:border-gray-300 hover:text-secondary-blue-500 ${pathname === path.slug ? "active text-secondary-blue-500 border-b-2 border-secondary-blue-500" : "border-transparent text-neutral-700"}`}
            href={path.slug}
          >
            {path.title}
          </Link>
        )
      })}
    </>
  )
}
export default NavLinks

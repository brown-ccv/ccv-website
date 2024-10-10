"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLinks = () => {
  const paths = [
    { slug: "/services", title: "Services" },
    { slug: "/our-work", title: "Our Work" },
    { slug: "/help", title: "Help" },
    { slug: "/about", title: "About" },
    { slug: "/blog", title: "Blog" },
  ]
  const pathname = usePathname()

  return (
    <>
      {paths.map((path) => {
        return (
          <Link
            className={`link rounded-md bg-gray-900 px-3 py-2 font-medium ${pathname === path.slug ? "active text-secondary-blue-500" : "text-neutral-700"}`}
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

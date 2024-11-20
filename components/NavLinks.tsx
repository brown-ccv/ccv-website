import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface NavLinksProps {
  type?: string
}

const NavLinks: React.FC<NavLinksProps> = ({ type }) => {
  const navigation = [
    {
      title: "Services",
      href: "/services",
      routes: [
        { title: "Classroom", href: "/services/classroom" },
        { title: "Computing", href: "/services/computing" },
        {
          title: "Campus File Storage and Transfer",
          href: "/services/file-storage-and-transfer",
        },
        { title: "Rates", href: "/services/rates" },
        { title: "Visualization Systems", href: "/services/visualization" },
        { title: "Consulting", href: "/services/consulting" },
      ],
    },
    {
      title: "Documentation",
      href: "/documentation",
      routes: [
        { title: "Oscar", href: "https://docs.ccv.brown.edu" },
        {
          title: "Stronghold",
          href: "/services/computing#data-risk-level-3-computing-(stronghold)",
        },
        { title: "Globus", href: "/services/file-storage-and-transfer#globus" },
        { title: "Jupyter Hub", href: "/services/classroom#jupyterhub" },
      ],
    },
    {
      title: "Our Work",
      href: "/our-work",
      routes: [
        { title: "Collaborations", href: "#" },
        {
          title: "Software",
          href: "/our-work/software",
        },
        {
          title: "Workshops and Talks",
          href: "/our-work/workshops-and-talks",
        },
        {
          title: "Publications",
          href: "https://publications.ccv.brown.edu",
        },
      ],
    },
    {
      title: "Help",
      href: "/help",
      routes: [
        { title: "Submit a Ticket", href: "mailto:support@ccv.brown.edu" },
        {
          title: "Discourse",
          href: "https://ask.cyberinfrastructure.org/c/brown-research-computing/37",
        },
        {
          title: "Slack",
          href: "https://ccv-share.slack.com/signup#/",
        },
        {
          title: "Office Hours",
          href: "https://events.brown.edu/ccv/month",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      routes: [
        { title: "Mission", href: "/about#mission" },
        {
          title: "Office of Information Technology",
          href: "/about#office-of-information-technology",
        },
        {
          title: "Our Teams",
          href: "/about#our-teams",
        },
        {
          title: "People",
          href: "/about#people",
        },
        {
          title: "Opportunities",
          href: "/about#opportunities",
        },
        {
          title: "Events",
          href: "https://events.brown.edu/ccv/month",
        },
        {
          title: "Facilities Statement",
          href: "/about#facilities-statement",
        },
        {
          title: "Diversity Statement",
          href: "/about#diversity-statement",
        },
      ],
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ]
  //const pathname = usePathname()

  if (type === "mobile") {
    return (
      <>
        {navigation.map((path) => {
          return (
            <div key={path.href}>
              <DropdownMenuLabel>{path.title}</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={path.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Explore {path.title}
                  </NavigationMenuLink>
                </Link>
              </DropdownMenuItem>
              {path.routes &&
                path.routes.map((route) => {
                  return (
                    <DropdownMenuItem key={route.href}>
                      <Link href={route.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {route.title}
                        </NavigationMenuLink>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              <DropdownMenuSeparator />
            </div>
          )
        })}
      </>
    )
  }
  return (
    <>
      {navigation.map((path) => {
        return (
          <div key={path.href}>
            {path.routes && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>{path.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-neutral-50">
                  <ul className="grid gap-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li>
                      <Link href={path.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Explore {path.title}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    {path.routes.map((item) => {
                      return (
                        <li key={item.href}>
                          <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              {item.title}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {!path.routes && (
              <NavigationMenuItem>
                <Link href={path.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {path.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </div>
        )
      })}
    </>
  )
}
export default NavLinks

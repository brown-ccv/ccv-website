"use client"
import * as React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Button from "@/components/Button"
import CCVLogo from "@/components/assets/CCVLogo"
import LogoBrown from "@/components/assets/BrownLogo"
import Link from "next/link"
import { navigation } from "@/components/NavItems"

interface RouteItem {
  title: string
  href: string
}

interface NavigationProps {
  routes: RouteItem[]
  parentTitle: string
  parentHref: string
}

const Navbar = () => {
  return (
    <div className="bg-neutral-50 p-2 shadow flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <a href="https://it.brown.edu">
          <LogoBrown width={135} />
        </a>
        <Link href={"/"}>
          <CCVLogo width={105} />
        </Link>
      </div>

      {/* Navigation Menu for Desktop */}
      <NavigationMenu.Root className="hidden lg:block">
        <NavigationMenu.List className="flex list-none space-x-5">
          {navigation.map((item) => {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Trigger className="group inline-flex h-9 items-center justify-center gap-2 rounded-md bg-background px-4 py-2 text-md font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  {item.title}
                  <ChevronDownIcon
                    className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  />
                </NavigationMenu.Trigger>
                {item.routes && (
                  <NavigationLinks
                    routes={item.routes}
                    parentHref={item.href}
                    parentTitle={item.title}
                  />
                )}
              </NavigationMenu.Item>
            )
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      {/* Search Icon */}
      <div>
        <Button variant="tertiary">
          <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="block lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white p-2">
            <Bars3Icon
              aria-hidden="true"
              className="h-5 w-5 text-neutral-500"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-50 mt-3 z-50 overflow-y-scroll h-96">
            <MobileLinks />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

const MobileLinks = () => {
  return (
    <>
      {navigation.map((path) => {
        return (
          <div key={path.href}>
            <DropdownMenuLabel>{path.title}</DropdownMenuLabel>
            <DropdownMenuItem className="p-2 hover:bg-white hover:text-secondary-blue-700">
              <Link
                href={path.href}
                className="p-2 focus:outline-none focus:bg-white focus:text-secondary-blue-700"
              >
                Explore {path.title}
              </Link>
            </DropdownMenuItem>
            {path.routes &&
              path.routes.map((route) => {
                return (
                  <DropdownMenuItem
                    key={route.href}
                    className="p-2 hover:bg-white hover:text-secondary-blue-700"
                  >
                    <Link
                      href={route.href}
                      className="p-2 focus:outline-none focus:bg-white focus:text-secondary-blue-700"
                    >
                      {route.title}
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
const NavigationLinks: React.FC<NavigationProps> = ({
  routes,
  parentTitle,
  parentHref,
}) => {
  return (
    <NavigationMenu.Content className="absolute top-[100%] z-50 w-max rounded-md shadow-md">
      <ul className="list-none p-4 m-0 bg-neutral-50 flex flex-col gap-2">
        <li className="p-2 hover:bg-white hover:text-secondary-blue-700">
          <NavigationMenu.Link
            href={parentHref}
            className="p-2 focus:outline-none focus:bg-white focus:text-secondary-blue-700"
          >
            Explore {parentTitle}
          </NavigationMenu.Link>
        </li>
        {routes.length > 0 &&
          routes.map((route) => (
            <li
              key={route.href}
              className="p-2 hover:bg-white hover:text-secondary-blue-700"
            >
              <NavigationMenu.Link
                href={route.href}
                className="p-2 focus:outline-none focus:bg-white focus:text-secondary-blue-700"
              >
                {route.title}
              </NavigationMenu.Link>
            </li>
          ))}
      </ul>
    </NavigationMenu.Content>
  )
}

export default Navbar

"use client"
import * as React from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Bars3Icon } from "@heroicons/react/24/outline"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Button from "@/components/Button"
import LogoCcv from "@/components/assets/LogoCcv"
import LogoBrown from "@/components/assets/LogoBrown"
import NavLinks from "@/components/NavLinks"

const Navbar = () => {
  return (
    <NavigationMenu className="bg-neutral-50 p-2 shadow flex justify-between">
      <section className="flex space-x-3">
        <LogoBrown width={135} />
        <LogoCcv width={105} />
      </section>
      <section className="hidden md:block">
        <NavigationMenuList>
          <NavLinks />
        </NavigationMenuList>
      </section>
      <section>
        <Button variant="tertiary">
          <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
        </Button>
      </section>
      <section className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-white p-2">
            <Bars3Icon
              aria-hidden="true"
              className="h-5 w-5 text-neutral-500"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-50 mt-3 overflow-y-scroll h-96">
            <NavLinks type="mobile" />
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </NavigationMenu>
  )
}
export default Navbar

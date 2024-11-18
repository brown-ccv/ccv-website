"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import LogoCcv from "@/components/assets/LogoCcv"
import LogoBrown from "@/components/assets/LogoBrown"
import NavLinks from "@/components/NavLinks"
import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
  return (
    <NavigationMenu className="bg-neutral-50 shadow">
      <NavigationMenuList>
        <NavLinks />
      </NavigationMenuList>
    </NavigationMenu>
  )
}
export default Navbar

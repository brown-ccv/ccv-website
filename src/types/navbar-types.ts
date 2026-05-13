import React from "react"

interface RouteItem {
  name: string
  href: string
  description?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

type RouteGroup = {
  name: string
  routes: RouteItem[]
}

type NavSection = {
  name: string
  groups: RouteGroup[]
}
export type { RouteItem, RouteGroup, NavSection }

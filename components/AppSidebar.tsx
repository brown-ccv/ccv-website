import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Link from "next/link"
import React from "react"

export type SidebarItem = {
  id: string
  label: string
}

export function AppSidebar({
  title = "On this page",
  items,
}: {
  title?: string
  items: SidebarItem[]
}) {
  if (!items.length) return null
  return (
    <Sidebar
      className="bg-white"
      style={
        {
          top: "var(--navbar-height, 120px)",
          height: "calc(100svh - var(--navbar-height, 120px))",
        } as React.CSSProperties
      }
    >
      <SidebarHeader>{title}</SidebarHeader>
      <SidebarContent>
        <ul className="space-y-2 pl-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="text-sm text-neutral-700 hover:text-black hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

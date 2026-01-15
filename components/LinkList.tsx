import React from "react"
import Icon from "@/components/ui/RenderIcon"
import { cn } from "@/lib/utils"
import { Link } from "@/components/Link"

interface LinkListProps {
  links: LinkListItemProps[]
  className?: string
}

interface LinkListItemProps {
  label: string
  url: string
}

export function LinkList({ links, className }: LinkListProps) {
  return (
    <ul
      className={cn(
        "flex list-none flex-col flex-wrap md:flex-row md:items-end lg:px-12",
        className
      )}
    >
      {links.map((link, i) => {
        return (
          <li className="p-2 md:w-1/2 md:px-6" key={i}>
            <Link
              className="group flex items-center gap-3 border-b border-slate-300 pb-3 leading-tight no-underline hover:border-keppel-500"
              href={link.url}
            >
              {link.label}
              <Icon
                className="flex-shrink-0 text-sunglow-400 group-hover:text-keppel-500"
                iconName="FaExternalLinkAlt"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

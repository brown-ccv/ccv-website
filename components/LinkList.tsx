import React from "react"
import Icon from "@/components/ui/RenderIcon"
import { cn } from "@/lib/utils"

interface LinkListProps {
  links: LinkProps[]
  className?: string
}

interface LinkProps {
  label: string
  url: string
}

export const LinkList: React.FC<LinkListProps> = ({ links, className }) => {
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
            <a
              className="group flex items-center gap-3 border-b border-slate-300 pb-3 leading-tight no-underline hover:border-keppel-500"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <Icon
                className="flex-shrink-0 text-sunglow-400 group-hover:text-keppel-500"
                iconName="FaExternalLinkAlt"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

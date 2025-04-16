"use client"
import Link from "next/link"
import React from "react"

interface SectionHeaderProps {
  title: string
  href: string
  icon?: React.ReactNode
}

const SectionHeader = ({ title, href, icon }: SectionHeaderProps) => {
  return (
    <Link href={href} className="text-neutral-900">
      <h2 className="text-3xl bg-keppel-500 text-white p-4 flex items-center gap-2">
        {icon && icon} <span>{title}</span>
      </h2>
    </Link>
  )
}

export default SectionHeader

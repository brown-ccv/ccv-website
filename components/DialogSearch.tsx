"use client"

import React, { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/Dialog"
import { Button } from "@/components/button/Button"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { usePathname } from "next/navigation"
import { SitewideSearch } from "@/components/SitewideSearch"

interface DialogSearchProps {
  searchTitle: string
}

export function DialogSearch({ searchTitle }: DialogSearchProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const titleId = React.useId()
  const descriptionId = React.useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="icon_only"
          iconOnly={<FaMagnifyingGlass />}
          className="bg-red-university text-white"
        >
          {searchTitle}
        </Button>
      </DialogTrigger>

      <DialogContent
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="top-[10%] translate-y-0 gap-0 overflow-hidden rounded-md bg-white p-0 sm:max-w-2xl"
      >
        <DialogTitle id={titleId} className="sr-only">
          {searchTitle}
        </DialogTitle>
        <DialogDescription id={descriptionId} className="sr-only">
          Search the CCV site and related documentation.
        </DialogDescription>
        <SitewideSearch />
      </DialogContent>
    </Dialog>
  )
}

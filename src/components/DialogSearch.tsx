"use client"

import React, { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Button } from "@/components/button/Button"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Search } from "@/components/Search"
import { usePathname } from "next/navigation"

interface DialogSearchProps {
  searchTitle: string
}

export function DialogSearch({ searchTitle }: DialogSearchProps): JSX.Element {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

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

      <DialogContent className="top-[10%] translate-y-0 gap-0 overflow-hidden rounded-md bg-white p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">{searchTitle}</DialogTitle>
        <Search />
      </DialogContent>
    </Dialog>
  )
}

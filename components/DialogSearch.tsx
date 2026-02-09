import React from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Button } from "@/components/button/Button"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Search } from "@/components/Search"

interface DialogSearchProps {
  searchTitle: string
}

export function DialogSearch({ searchTitle }: DialogSearchProps): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="icon_only"
          iconOnly={<FaMagnifyingGlass />}
          className="bg-red-university text-white"
        >
          {searchTitle}
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden bg-white p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">{searchTitle}</DialogTitle>
        <Search />
      </DialogContent>
    </Dialog>
  )
}

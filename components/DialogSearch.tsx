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

export function DialogSearch() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="icon_only"
          iconOnly={<FaMagnifyingGlass />}
          className="bg-red-university text-white"
        >
          Search CCV
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden bg-white p-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">Search CCV</DialogTitle>
        <Search />
      </DialogContent>
    </Dialog>
  )
}

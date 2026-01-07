import SearchInput from "@/components/SearchInput"
import React, { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { Button } from "@/components/button/Button"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IconButton } from "@/components/button/IconButton"
import { Input } from "@/components/ui/Input"

const SiteSearch: React.FC = ({}) => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  return (
    <Dialog onOpenChange={() => setSearchQuery("")}>
      <DialogTrigger asChild>
        <Button
          variant="icon_only"
          iconOnly={<FaMagnifyingGlass />}
          className="bg-red-university text-white"
        />
      </DialogTrigger>
      <DialogContent className="bg-white p-1">
        <DialogTitle className="border-b border-gray-400">
          <SearchInput
            name="site-search"
            onSearchChange={(val) => setSearchQuery(val)}
          />
        </DialogTitle>
        <p>{searchQuery}</p>
      </DialogContent>
    </Dialog>
  )
}

export default SiteSearch
